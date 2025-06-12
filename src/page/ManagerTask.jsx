import React, { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Progress,
  Row,
  Select,
  Spin,
  Table,
} from "antd";

import {
  APIAddTask,
  APIDeleteTaskByID,
  APIDoneTaskByID,
  APIEditTaskByID,
  APIGetAllEmployee,
  APIGetAllTask,
  APIGetTaskByID,
  APIGetTaskUserId,
} from "../api/axios";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { sSpin } from "../store/spinAll";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";
const sharedProps = {
  mode: "multiple",
  style: { width: "100%" },
  placeholder: "Select Employee...",
  maxTagCount: "responsive",
};
export default function ManagerTask() {
  const [form] = Form.useForm();
  const [dataId, setDataId] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [valueSearch, setValueSearch] = useState(null);
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  //   const [employeeSelected, setEmployeeSelected] = useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (n, o) => {
        return <>{n ? n : "-"}</>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description  ",
      render: (n, o) => {
        return <>{n ? n : "-"}</>;
      },
    },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "description  ",
      render: (n, o) => {
        console.log(n);
        return <>{n ? n.length : "0"}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (n, o) => {
        return (
          <>
            {o?.done ? (
              <Progress
                type="circle"
                percent={100}
                format={() => "Done"}
                size={50}
                // style={{ height: "40px" }}
              />
            ) : (
              <Progress
                type="circle"
                percent={30}
                format={() => "In Progress"}
                size={50}
                // style={{ height: "40px" }}
              />
            )}
          </>
        );
      },
    },
  ];
  const columnsOwner = [
    {
      title: "Edit",
      key: "edit",
      render: (record) => (
        <Button
          type="default"
          onClick={() => {
            showModal(record.id);
            console.log(record);
          }}
        >
          <EditOutlined />
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (record) => (
        <Popconfirm
          title="Delete task"
          description="Are you sure you want to delete this task?"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => deleteData(record.id)}
        >
          <Button danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const columnsEmployee = [
    {
      title: "Make Done",
      key: "makeDone",
      render: (record) => (
        <Popconfirm
          title="Done task"
          description="Are you sure you want to done this task?"
          icon={<CheckOutlined style={{ color: "green" }} />}
          onConfirm={() => {
            APIDoneTaskByID(record.id).then((data) => {
              toast.success("Done task successfully");
            });
          }}
          disabled={record?.done}
        >
          <Button
            disabled={record?.done}
            type="default"
            onClick={() => {
              console.log(record);
            }}
          >
            <CheckOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];
  if (role === "owner") {
    columns.push(...columnsOwner);
  } else {
    columns.push(...columnsEmployee);
  }
  const { Search } = Input;

  //   const selectProps = {
  //     employeeSelected,
  //     onChange: setEmployeeSelected,
  //   };
  const showModal = (record) => {
    setDataId(record);
  };
  const handleCancel = () => {
    setDataId("");
    form.resetFields();
  };
  const getData = () => {
    if (dataTable == null) {
      sSpin.set(true);
    }
    role == "owner"
      ? APIGetAllTask()
          .then((data) => {
            console.log(data.data?.tasks);
            setDataTable(data.data?.tasks);
          })
          .catch((error) => {
            setDataTable([]);
          })
          .finally(() => {
            sSpin.set(false);
          })
      : APIGetTaskUserId(id)
          .then((data) => {
            console.log(data.data);
            setDataTable(data.data?.data);
          })
          .catch((error) => {
            setDataTable([]);
          })
          .finally(() => {
            sSpin.set(false);
          });
  };
  const getEmployee = () => {
    sSpin.set(true);
    APIGetAllEmployee()
      .then((data) => {
        setEmployees(data.data?.data);
      })
      .catch((error) => {
        setEmployees([]);
      })
      .finally(() => {
        sSpin.set(false);
      });
  };
  const addData = (values) => {
    sSpin.set(true);
    APIAddTask(values.name, values.description, values.employees)
      .then(() => {
        toast.success("Add Task successfully");
        handleCancel();
        getData();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response?.data?.message ||
            "Something went wrong, please try again"
        );
      })
      .finally(() => {
        sSpin.set(false);
      });
  };
  const updateData = (values) => {
    APIEditTaskByID(dataId, values.name, values.description, values.employees)
      .then(() => {
        toast.success("Update Task successfully");
        handleCancel();
        getData();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  };
  const deleteData = (id) => {
    APIDeleteTaskByID(id)
      .then((data) => {
        console.log(data);
        toast.success("Delete tasks success!!!");
        getData();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  };
  const onFinish = async (values) => {
    dataId == "0" ? addData(values) : updateData(values);
  };
  const onSearch = (value, _e, info) => {
    setValueSearch(value.length > 0 ? value : null);
  };
  useEffect(() => {
    getData();
    getEmployee();
  }, []);
  useEffect(() => {
    const tasksRef = ref(db, `tasks`);
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      getData();
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (dataId?.length > 1) {
      APIGetTaskByID(dataId).then((data) => {
        const dataCurrent = data?.data?.task;
        console.log(dataCurrent);
        form.setFieldsValue({
          description: dataCurrent?.description,
          name: dataCurrent?.name,
          employees: dataCurrent?.employees || [],
        });
      });
    }
  }, [dataId]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 16px",
        }}
      >
        <h1 style={{ fontSize: "32px", color: "rgb(38, 164, 255)" }}>
          Manage Tasks
        </h1>
        <Search
          placeholder="Search Name Tasks"
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: "600px" }}
        />
        {role == "owner" && (
          <Button type="primary" onClick={() => setDataId("0")}>
            Add new Task
          </Button>
        )}
        <Modal
          title={`${dataId?.length > 1 ? "Update" : "Add New"} Task`}
          visible={dataId ? true : false}
          onCancel={handleCancel}
          width={500}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,

            <Button
              type="primary"
              onClick={() => {
                form.submit();
              }}
            >
              {` ${dataId?.length > 1 ? "Update" : "Add New"} Task`}
            </Button>,
          ]}
        >
          <div style={{ margin: "auto" }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={24}>
                <Col span={24}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Name of Task",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Name of Task" />
                      </Form.Item>
                    </Col>
                    {/* <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Email of Employee",
                          },
                        ]}
                      >
                        <Input
                          readOnly={dataId !== "0"}
                          placeholder="Enter Email of Employee"
                        />
                      </Form.Item>
                    </Col> */}
                  </Row>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Description of Task",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Description of Task"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item name="employees" label="Employees">
                    <Select
                      // defaultValue="lucy"
                      {...sharedProps}
                      //   {...selectProps}
                      style={{
                        width: "100%",
                      }}
                      // onChange={handleChange}
                      options={employees?.map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/*  */}
            </Form>
          </div>
        </Modal>
      </div>

      <Table
        dataSource={
          valueSearch
            ? dataTable.filter((a) =>
                a?.name?.toUpperCase().includes(valueSearch.toUpperCase())
              )
            : dataTable
        }
        columns={columns}
        pagination={{
          pageSize: 6,
        }}
        style={{ marginTop: "24px" }}
        // onChange={onChangePaging}
      />
    </div>
  );
}
