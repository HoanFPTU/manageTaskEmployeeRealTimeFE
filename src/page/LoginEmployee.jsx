import React, { useEffect, useState } from "react";
import LayoutLogin from "../layout/layoutLogin";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  APIGetAccessCode,
  APIGetAccessCodeEmployee,
  APILoginEmployee,
} from "../api/axios";
import { sSpin } from "../store/spinAll";
import { toast } from "react-toastify";

export default function LoginEmployee({}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const HandleLogin = async (values) => {
    sSpin.set(true);
    check
      ? APIGetAccessCodeEmployee(values.email)
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
          })
      : APILoginEmployee(values.username, values.password)
          .then((res) => {
            console.log(res);
            toast.success("Login successfully");
            console.log(res);
            localStorage.setItem("role", "employee");
            localStorage.setItem("id", res.data.employeeId);
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
      <h1 className="text-3xl text-center mt-2 font-bold">Employee Login</h1>

      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={HandleLogin}
      >
        {!check ? (
          <>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Username cannot be left blank",
                },
              ]}
            >
              <Input type="text" placeholder=" Enter your username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Email cannot be left blank",
                },
              ]}
            >
              <Input.Password type="text" placeholder=" Enter your password" />
            </Form.Item>
          </>
        ) : (
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
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Next
          </Button>
        </Form.Item>
        <Checkbox
          checked={check}
          onChange={(e) => {
            setCheck(e.target.checked);
          }}
        >
          Login with accessCode Email
        </Checkbox>
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
