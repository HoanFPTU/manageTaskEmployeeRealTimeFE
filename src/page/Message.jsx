import {
  SearchOutlined,
  SendOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
import React, { useEffect, useState } from "react";
import { APIGetAllEmployee } from "../api/axios";
import { sSpin } from "../store/spinAll";
import { ChatBubble } from "../components/ChatBubble";
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const items = [
  {
    label: "1st menu item",
    key: "1",
  },
  {
    label: "2nd menu item",
    key: "2",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
export default function Message() {
  const [employees, setEmployees] = useState([]);
  const [isIdSelect, setIdSelect] = useState(null);
  const [valueSearch, setValueSearch] = useState("");
  const id = localStorage.getItem("id");
  console.log(id);
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
  };
  useEffect(() => {
    getEmployee();
  }, []);
  const handleChangeSearch = (valueSearch) => {
    setValueSearch(valueSearch);
  };
  return (
    <div className="flex h-full w-full gap-4 ">
      {/* Sidebar */}
      <div className="w-1/3 max-w-[280px] bg-gray-50 rounded-2xl p-4 flex flex-col gap-4 ">
        <div className="flex items-center gap-2">
          <Avatar src={"/avt.jpg"} size="large" />
          <span className="font-bold">Owner ({id})</span>
        </div>
        {/* <Input.Search placeholder="Search..." className="rounded-md" /> */}
        <div className="w-full ">
          <AutoComplete
            // style={{ width: 300 }}
            options={employees
              .map((e) => ({
                ...e,
                label: e.name,
                value: e.id,
              }))
              .filter((a) =>
                a?.label?.toUpperCase().includes(valueSearch.toUpperCase())
              )}
            className="w-full"
            onChange={handleChangeSearch}
            onSearch={() => {
              console.log(true);
            }}
            onSelect={onSelect}
            placeholder="Search by name"
            value={valueSearch}
          >
            <Input.Search />
          </AutoComplete>
        </div>
        <h2 className="text-lg font-semibold">All Message</h2>
        {/* User Chat Item */}
        <div className=" flex flex-col gap-4 flex-1 overflow-y-scroll scrollbar-hide ">
          {[1, 2, 3, 2, 2, 2, 9].map((a) => (
            <>
              <div className="bg-white rounded-xl p-3 shadow flex flex-col gap-1 cursor-pointer hover:opacity-70 ">
                <div className="flex items-center gap-2">
                  <Avatar icon={<UserOutlined />} size="large" />
                  <span className="font-medium">Employee 1</span>
                </div>
                <div className="text-sm text-gray-500">Hello</div>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-gray-100 rounded-2xl flex flex-col justify-between">
        <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-t-2xl">
          <Avatar icon={<UserOutlined />} size="large" />
          <span className="font-bold">Owner ({isIdSelect && isIdSelect})</span>
        </div>
        <div className="flex-1 p-4  bg-gray-100 overflow-y-scroll scrollbar-hide">
          <ChatBubble
            isMe
            message={"abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc y"}
          />
          <ChatBubble message={"abc"} />
          <ChatBubble isMe message={"abc"} />
          <ChatBubble isMe message={"abc"} />
          <ChatBubble isMe message={"abc"} />
        </div>

        {/* Input Area */}
        <Form className="m-0 p-0" onFinish={(values) => console.log(values)}>
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item
              name="message"
              className="w-full"
              style={{ marginBottom: "-24px" }}
            >
              <Input placeholder="Typing message" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              <SendOutlined />
            </Button>
          </Space.Compact>
        </Form>
        {/* <div className="bg-gray-300 rounded-b-2xl p-3">
          <Input placeholder="Reply message" className="rounded-md" />
        </div> */}
      </div>
    </div>
  );
}
