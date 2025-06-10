import React, { useEffect, useState } from "react";
import LayoutLogin from "../layout/layoutLogin";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { APIGetAccessCode } from "../api/axios";
import { sSpin } from "../store/spinAll";
import { toast } from "react-toastify";

export default function Login({}) {
  const navigate = useNavigate();
  const HandleLogin = async (values) => {
    sSpin.set(true);

    APIGetAccessCode(values.phoneNumber)
      .then((res) => {
        console.log(res);
        toast.success("Access code sent to your phone");
        navigate("/accessCode", { state: { phoneNumber: values.phoneNumber } });
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
      <h1 className="text-3xl text-center mt-2 font-bold">Owner Login</h1>
      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={HandleLogin}
      >
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Phone cannot be left blank",
            },
            { whitespace: true, message: "Phone don't have space" },
            {
              pattern: "[0-9]{10}",
              min: 9,
              max: 11,
              message: "Phone must contain 10 number",
            },
          ]}
        >
          <Input type="text" placeholder=" Enter your phone" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Next
          </Button>
        </Form.Item>
      </Form>
      <p
        className="text-base text-end underline cursor-pointer hover:opacity-60"
        onClick={() => navigate("/loginEmployee")}
      >
        Switch to Employee
      </p>
    </LayoutLogin>
  );
}
