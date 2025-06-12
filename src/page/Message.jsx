import { SendOutlined, UserOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Button,
  Dropdown,
  Form,
  Input,
  List,
  message,
  Space,
} from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useRef, useState } from "react";
import { APIGetAllEmployee } from "../api/axios";
import { sSpin } from "../store/spinAll";
import { ChatBubble } from "../components/ChatBubble";
import {
  APIgetAllConversationsOfUser,
  APIgetConversation,
  APISeenChat,
  APIsendMessage,
  APIStartConversation,
} from "../firebase/chatServices";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";
import {
  formatTimestamp,
  getIdPartner,
  getNameByConversationId,
  getNameById,
} from "../utils/utils";

export default function Message() {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [allMessage, setAllMessage] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [idSelect, setIdSelect] = useState(null);
  const [valueSearch, setValueSearch] = useState("");
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const bottomRef = useRef(null);
  console.log(idSelect);
  const optionsOwner = employees
    .map((e) => ({
      ...e,
      label: e.name,
      value: e.id,
    }))
    .filter((a) => a?.label?.toUpperCase().includes(valueSearch.toUpperCase()));

  const optionsEmployees = allMessage?.map((a) => {
    return {
      label: getNameByConversationId(a.id, employees),
      value: getIdPartner(a.id),
    };
  });
  const getAllChat = async () => {
    APIgetAllConversationsOfUser(id).then((data) => {
      console.log(data);
      if (allMessage?.length == 0) {
        if (idSelect == null) {
          setIdSelect(getIdPartner(data[0]?.id));
        }
      }
      setAllMessage(data);
    });
  };
  const getEmployee = () => {
    sSpin.set(true);
    APIGetAllEmployee()
      .then((data) => {
        console.log(data);
        setEmployees(data.data?.data);
      })
      .catch((error) => {
        setEmployees([]);
      })
      .finally(() => {
        sSpin.set(false);
      });
  };
  const onSelect = (data) => {
    setIdSelect(data);
    setValueSearch("");
    // console.log(data);
  };
  const onFinish = (values) => {
    sendMessage(values);
  };

  useEffect(() => {
    getEmployee();
    getAllChat();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = AP(currentUserId, (convs) => {
  //     setConversations(convs);
  //   });

  //   return () => unsubscribe(); // cleanup listener khi unmount
  // }, []);
  const sendMessage = (values) => {
    if (conversation?.message?.length > 0) {
      APIsendMessage(id, idSelect, values.message).then(() => {
        form.resetFields();
      });
    } else {
      APIStartConversation(id, idSelect).then((data) => {
        APIsendMessage(id, idSelect, values.message).then(() => {
          form.resetFields();
        });
      });
    }
  };
  const handleChangeSearch = (valueSearch) => {
    setValueSearch(valueSearch);
  };
  // useEffect(() => {
  //   if (idSelect?.length > 0) {
  //     APIgetConversation(id, idSelect).then((data) => {
  //       console.log(data);
  //       setConversation(data);
  //     });
  //   }
  // }, [idSelect]);
  useEffect(() => {
    // Mỗi lần messages thay đổi, scroll tới cuối
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    form.focusField("message");
  }, [conversation]);
  // real-time
  useEffect(() => {
    const conversationId = [id, idSelect].sort().join("*_*");
    const messagesRef = ref(db, `conversations/${conversationId}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      APIgetConversation(id, idSelect).then((data) => {
        console.log(data);
        setConversation(data);
      });
    });

    return () => unsubscribe();
  }, [idSelect]);
  useEffect(() => {
    const conversationsRef = ref(db, "conversations");

    const unsubscribe = onValue(conversationsRef, async () => {
      getAllChat();
    });

    return () => unsubscribe(); // cleanup listener
  }, [id]);
  return (
    <div className="flex h-full w-full gap-4 ">
      {/* Sidebar */}
      <div className="w-1/3 max-w-[280px] bg-gray-50 rounded-2xl p-4 flex flex-col gap-4 ">
        <div className="flex items-center gap-2">
          <Avatar icon={<UserOutlined />} size="large" />
          <span className="font-bold"> {getNameById(id, employees)}</span>
        </div>
        {/* <Input.Search placeholder="Search..." className="rounded-md" /> */}
        <div className="w-full ">
          <AutoComplete
            // style={{ width: 300 }}
            options={role == "owner" ? optionsOwner : optionsEmployees}
            className="w-full"
            onChange={handleChangeSearch}
            onSearch={() => {
              console.log(true);
            }}
            onSelect={onSelect}
            placeholder={
              role == "owner"
                ? "Search employees to chat"
                : "Search conversation"
            }
            value={valueSearch}
          >
            <Input.Search />
          </AutoComplete>
        </div>
        <h2 className="text-lg font-semibold">All Message</h2>

        <div className=" flex flex-col gap-4 flex-1 overflow-y-scroll scrollbar-hide ">
          {allMessage?.map((a) => (
            <>
              <div
                className="bg-white rounded-xl p-3 shadow flex flex-col gap-1 cursor-pointer hover:opacity-70 "
                onClick={() => {
                  const idPartner = getIdPartner(a.id);
                  if (idPartner !== idSelect) {
                    setIdSelect(idPartner);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <Avatar icon={<UserOutlined />} size="large" />
                  <span className="font-medium">
                    {getNameByConversationId(a.id, employees)}
                  </span>
                </div>
                <div
                  className={`text-sm text-black ${
                    !a.lastMessage?.seen && a.lastMessage?.senderId != id
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {a?.lastMessage?.text}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      {/* Chat Area */}
      <div className="flex-1 bg-gray-100 rounded-2xl flex flex-col justify-between">
        {idSelect ? (
          <>
            <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-t-2xl">
              <Avatar icon={<UserOutlined />} size="large" />
              <span className="font-bold">
                {getNameById(idSelect, employees)}
              </span>
            </div>
            <div className="flex-1 p-4  bg-gray-100 overflow-y-scroll scrollbar-hide">
              {/* <ChatBubble
            isMe
            message={"abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc y"}
          />
          <ChatBubble message={"abc"} />
          <ChatBubble isMe message={"abc"} />
          <ChatBubble isMe message={"abc"} />
          <ChatBubble isMe message={"abc"} /> */}
              {conversation?.messages?.map((a) => {
                return (
                  <ChatBubble
                    message={a.text}
                    isMe={a.senderId == id}
                    date={formatTimestamp(a?.timestamp)}
                  />
                );
              }) || <p className="text-center">Start chat with employees</p>}
              {conversation?.lastMessage?.seen &&
                conversation?.lastMessage?.senderId == id && (
                  <p
                    className="text-xs text-gray-500 text-end px-2 "
                    style={{ marginTop: "-4px" }}
                  >
                    Seen
                  </p>
                )}
              <div ref={bottomRef}></div>
            </div>

            {/* Input Area */}
            <Form className="m-0 p-0" onFinish={onFinish} form={form}>
              <Space.Compact style={{ width: "100%" }}>
                <Form.Item
                  name="message"
                  style={{ marginBottom: "-24px" }}
                  className="w-full"
                >
                  <Input
                    placeholder="Typing message"
                    autoFocus
                    onFocus={() => {
                      const lastMessage = conversation?.lastMessage;

                      if (
                        lastMessage &&
                        !lastMessage.seen &&
                        lastMessage.senderId != id
                      ) {
                        APISeenChat(conversation?.id);
                      }
                    }}
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  <SendOutlined />
                </Button>
              </Space.Compact>
            </Form>
          </>
        ) : (
          <>Start Conversation</>
        )}
        {/* <div className="bg-gray-300 rounded-b-2xl p-3">
          <Input placeholder="Reply message" className="rounded-md" />
        </div> */}
      </div>
    </div>
  );
}
