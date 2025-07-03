import React from "react";
import { Row, Col, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";

function Register() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const { password, phone } = values;

    if (
      password.length >= 8 &&
      password.length <= 24 &&
      phone.length >= 11 &&
      phone.length <= 12
    ) {
      dispatch(userRegister(values));
      console.log(values);
    } else if (password.length > 24) {
      message.error("Password is very lengthy to remember");
    } else if (password.length < 8) {
      message.error("Password is weak");
    } else if (phone.length > 12 || phone.length < 11) {
      message.error("Invalid Phone Number");
    }
  };

  return (
    <div className="login">
      <Row gutter={8}>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1 className="login-heading">Register</h1>
            <hr />

            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input placeholder="Enter your username..." />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" placeholder="Enter your email address..." />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter your password..." />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input type="tel" placeholder="Enter your phone number..." />
            </Form.Item>

            <button type="submit" className="btn2 mt-2 mb-3">
              Register
            </button>
            <br />
            <Link to="/login">Click here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
