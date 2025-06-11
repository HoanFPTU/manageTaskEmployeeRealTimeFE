import React, { useEffect, useState } from "react";
import LayoutLogin from "../layout/layoutLogin";
import { Button, Checkbox, Form, Input, message, Statistic } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  APIGetAccessCode,
  APIGetAccessCodeEmployee,
  APIValidateCode,
  APIValidateCodeEmployee,
} from "../api/axios";
import { sSpin } from "../store/spinAll";
import { toast } from "react-toastify";
import { LeftOutlined } from "@ant-design/icons";
const { Timer } = Statistic;
export default function AccessCodeEmployee() {
  const [isGetAccessCode, setIsGetAccessCode] = useState(false);
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    if (!state || !state.email) {
      toast.error("Email is required");
      navigate("/loginEmployee");
    }
  }, [state, navigate]);

  const HandleLogin = async (email) => {
    sSpin.set(true);

    APIGetAccessCodeEmployee(email)
      .then((res) => {
        console.log(res);
        toast.success("Access code sent to your email");
        setIsGetAccessCode(true);
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
  const HandleValidateCodeEmployee = async (values) => {
    sSpin.set(true);

    APIValidateCodeEmployee(state.email, values.accessCode)
      .then((res) => {
        localStorage.setItem("role", "employee");
        toast.success("Access code validated successfully");
        navigate("/dashboard");
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
      <div
        className="absolute top-4 left-4  cursor-pointer p-4 hover:opacity-70"
        onClick={() => navigate(-1)}
      >
        <LeftOutlined />
      </div>
      <h1 className="text-3xl text-center mt-2 font-bold">
        Email verification Login
      </h1>
      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={HandleValidateCodeEmployee}
      >
        <Form.Item
          name="accessCode"
          rules={[
            {
              required: true,
              message: "Please enter access code ",
            },
            {
              pattern: "[0-9]{6}",
              min: 6,
              max: 6,
              message: "AccessCode must contain 6 number",
            },
          ]}
        >
          <Input placeholder="Enter Your Code" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full">
          Submit
        </Button>

        {isGetAccessCode ? (
          <>
            <span>Code is sent, resend after</span>
            <Timer
              type="countdown"
              value={Date.now() + 30000}
              onFinish={() => setIsGetAccessCode(false)}
            />
          </>
        ) : (
          <p className="text-base mt-2">
            Code not receive?{" "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => HandleLogin(state.email)}
            >
              Send again
            </span>
          </p>
        )}
      </Form>
    </LayoutLogin>
  );
}
