import React from "react";
import { Row, Col, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.alertsReducer);

  async function onFinish(values) {
    try {
      dispatch({ type: "LOADING", payload: true });

      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(data.message || "Login successful!");

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      } else {
        message.error(
          data.message || "Login failed. Please check credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      dispatch({ type: "LOADING", payload: false });
    }
  }

  return (
    <div className="login">
      {loading && <Spin size="large" className="spinner-overlay" />}
      <Row gutter={8}>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1 className="login-heading">Login</h1>
            <hr />
            <Form.Item
              name="email"
              label="Email Address"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                placeholder="Enter your email address..."
                className="p-2"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password..."
                className="p-2"
              />
            </Form.Item>

            <button type="submit" className="btn2 mt-2 mb-3">
              Login
            </button>
            <br />
            <Link to="/register">Click here to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
