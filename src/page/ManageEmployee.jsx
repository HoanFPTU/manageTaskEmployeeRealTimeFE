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
  Row,
  Spin,
  Table,
} from "antd";

import {
  APIAddEmployee,
  APIDeleteEmployeeByID,
  APIEditEmployeeByID,
  APIGetAllEmployee,
  APIGetEmployeeByID,
} from "../api/axios";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { sSpin } from "../store/spinAll";

export default function ManageEmployee() {
  const [form] = Form.useForm();
  const [dataId, setDataId] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [valueSearch, setValueSearch] = useState(null);
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department  ",
      render: (n, o) => {
        return <>{n ? n : "-"}</>;
      },
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (n, o) => {
        return <>{n ? n : "-"}</>;
      },
    },
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
          title="Delete Employee"
          description="Are you sure you want to delete this employee?"
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
  const { Search } = Input;
  const showModal = (record) => {
    setDataId(record);
  };
  const handleCancel = () => {
    setDataId("");
    form.resetFields();
  };
  const getData = () => {
    sSpin.set(true);
    APIGetAllEmployee()
      .then((data) => {
        console.log(data.data?.data);
        setDataTable(data.data?.data);
      })
      .catch((error) => {
        setDataTable([]);
      })
      .finally(() => {
        sSpin.set(false);
      });
  };

  const addData = (values) => {
    sSpin.set(true);
    APIAddEmployee(values.name, values.department, values.email)
      .then(() => {
        toast.success("Add Employee successfully");
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
    APIEditEmployeeByID(dataId, values.name, values.department)
      .then(() => {
        toast.success("Update Employee successfully");
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
    APIDeleteEmployeeByID(id)
      .then((data) => {
        console.log(data);
        toast.success("Delete Employee success!!!");
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
  }, []);
  useEffect(() => {
    if (dataId?.length > 1) {
      APIGetEmployeeByID(dataId).then((data) => {
        const dataCurrent = data?.data?.user;
        console.log(dataCurrent);
        form.setFieldsValue({
          department: dataCurrent?.department,
          email: dataCurrent?.email,
          name: dataCurrent?.name,
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
          Manage Employee
        </h1>
        <Search
          placeholder="Search Name Account"
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: "600px" }}
        />
        <Button type="primary" onClick={() => setDataId("0")}>
          Add new Employee
        </Button>
        <Modal
          visible={dataId ? true : false}
          title={`${dataId?.length > 1 ? "Update" : "Add New"} Employee`}
          onCancel={handleCancel}
          width={500}
          // onOk={form.submit()}
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
              {` ${dataId?.length > 1 ? "Update" : "Add New"} Employee`}
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
                            message: "Please Enter Name of Employee",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Name of Employee" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
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
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name="department"
                    label="Department"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Department of Employee",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Department of Employee"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/*  */}
            </Form>
          </div>
        </Modal>
      </div>

      {!dataTable ? (
        <Spin
          size="large"
          // style={{
          //   width: "100%",
          //   marginTop: "150px",
          // }}
          fullscreen
        ></Spin>
      ) : (
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
            pageSize: 8,
          }}
          style={{ marginTop: "24px" }}
          // onChange={onChangePaging}
        />
      )}
    </div>
  );
}
