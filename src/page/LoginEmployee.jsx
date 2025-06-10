import React, { useEffect, useState } from "react";
import LayoutLogin from "../layout/layoutLogin";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { APIGetAccessCode, APIGetAccessCodeEmployee } from "../api/axios";
import { sSpin } from "../store/spinAll";
import { toast } from "react-toastify";

export default function LoginEmployee({}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const HandleLogin = async (values) => {
    sSpin.set(true);

    APIGetAccessCodeEmployee(values.email)
      .then((res) => {
        console.log(res);
        toast.success("Access code sent to your email");
        navigate("/accessCodeEmployee", {
          state: { email: values.email },
        });
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
  return (
    <LayoutLogin>
      <h1 className="text-3xl text-center mt-2 font-bold">Employee Login</h1>
      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={HandleLogin}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Email cannot be left blank",
            },
          ]}
        >
          <Input type="text" placeholder=" Enter your Email" />
        </Form.Item>

        <p className="text-red">{errorMessage && errorMessage}</p>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Next
          </Button>
        </Form.Item>
      </Form>
      <p
        className="text-base text-end underline cursor-pointer hover:opacity-60"
        onClick={() => navigate("/")}
      >
        Switch to Owner
      </p>
    </LayoutLogin>
  );
}
