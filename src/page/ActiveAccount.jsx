import React, { useEffect, useState } from "react";
import LayoutLogin from "../layout/layoutLogin";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  APIActiveAccount,
  APIGetAccessCode,
  APIGetEmployeeByID,
} from "../api/axios";
import { sSpin } from "../store/spinAll";
import { toast } from "react-toastify";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";

export default function ActiveAccount() {
  const param = useSearchParams();
  const [id] = useState(param[0].get("id"));
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const HandleLogin = async (values) => {
    APIActiveAccount(values.username, values.password, id)
      .then((res) => {
        console.log(res);
        toast.success("Account activated successfully");
        navigate("/loginEmployee");
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

  useEffect(() => {
    const messagesRef = ref(db, `employees/${id}`);
    sSpin.set(true);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      sSpin.set(true);
      APIGetEmployeeByID(id)
        .then((data) => {
          console.log(data);
          form.setFieldsValue({
            email: data?.data?.user?.email,
          });
          if (data?.data?.user?.active) {
            // toast.error("Your account already active yet");
            navigate("/loginEmployee");
          }
        })
        .finally(() => {
          sSpin.set(false);
        });
    });

    return () => unsubscribe();
  }, []);
  return (
    <LayoutLogin>
      <h1 className="text-3xl text-center mt-2 font-bold">Active Account</h1>
      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={HandleLogin}
        form={form}
      >
        <Form.Item name="email">
          <Input readOnly type="text" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Username cannot be left blank",
            },
          ]}
        >
          <Input type="text" placeholder=" Enter your Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Password cannot be left blank",
            },
          ]}
        >
          <Input.Password type="text" placeholder=" Enter your password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Password cannot be left blank",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password type="text" placeholder=" Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Next
          </Button>
        </Form.Item>
      </Form>
      <p> Complete the final steps to get started</p>
    </LayoutLogin>
  );
}
