import { Button, Col, DatePicker, Flex, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APIEditEmployeeByID, APIGetEmployeeByID } from "../api/axios";
import TextArea from "antd/es/input/TextArea";
import {
  BookOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  PhoneOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

export default function EditProfile() {
  const [form] = Form.useForm();
  const id = localStorage.getItem("id");

  const navigate = useNavigate();
  const getProfile = async () => {
    APIGetEmployeeByID(id).then((data) => {
      const user = data?.data?.user;
      form.setFieldsValue({
        email: user?.email,
        name: user?.name,
        department: user?.department,
      });
    });
    //   APIGetInformation()
    //     .then((data) => {
    //       Cookies.set("userInfo", JSON.stringify(data.data.data), {
    //         expires: 3,
    //       });
    //       // console.log(data);
    //       // mỗi lần thay đổi gì trong use thì page này tự động set lại luôn...và mỗi lần vô trang này tự update userInfo
    //       const dataUser = data.data.data;
    //       console.log(dayjs(dataUser?.dob));
    //       SUser.set(dataUser);
    //       form.setFieldsValue({
    //         email: dataUser?.email,
    //         name: dataUser?.name,
    //         dob: dataUser?.dob && dayjs(dataUser?.dob),
    //         description: dataUser?.description,
    //         address: dataUser?.address,
    //         phone: dataUser?.phone,
    //         school: dataUser?.school,
    //         major: dataUser?.major,
    //         degree: dataUser?.degree,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       toast.error(error.response?.data?.msg);
    //     })
    //     .finally(() => {
    //       console.log("oke");
    //     });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const onFinish = async (values) => {
    APIEditEmployeeByID(id, values.name, values.department).then((data) => {
      toast.success("Edit profile successfully");
      getProfile();
    });
  };
  return (
    <>
      <Form size="middle" onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={24}>
          {/*full name field*/}
          <Col span={24}>
            <Form.Item
              style={{ width: "100%" }}
              name="email"
              label={
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#515B6F",
                  }}
                >
                  Email
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter your full name",
                },
              ]}
            >
              <Input style={{ height: "52px" }} readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          {/*full name field*/}
          <Col span={24}>
            <Form.Item
              style={{ width: "100%" }}
              name="name"
              label={
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#515B6F",
                  }}
                >
                  Full name
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter your full name",
                },
              ]}
            >
              <Input
                style={{ height: "52px" }}
                // placeholder={user.name}
              />
            </Form.Item>
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
                  message: "Please select your department",
                },
              ]}
            >
              <Input
                style={{ width: "100%", height: "50px" }}
                prefix={<ShopOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="primary"
          block
          htmlType="submit"
          style={{
            height: "44px",
            width: "98px",
            backgroundColor: "#4182F9",
            color: "#fff",
          }}
        >
          Edit
        </Button>
      </Form>
    </>
  );
}
