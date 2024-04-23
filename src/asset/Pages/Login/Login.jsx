import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../service/user_service.js";
import { InputText } from "primereact/inputtext";

import axios from "axios";
export const validateInput = (str = "") => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};

const Login = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const { loginApi } = useContext(AuthContext);
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
    setLoading(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
    setLoading(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginApi({ email, password });
      navigate("/danh-sach-dan");
    } catch (err) {
      const er = err.response.data.msg;
      if (er.includes("Incorrect")) {
        setError("Email hoặc mật khẩu sai");
      } else {
        setError("Chưa nhập email hoặc mật khẩu");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <div className="branding">
          <i
            className="pi pi-spin pi-slack"
            alt="Logo"
            style={{ fontSize: "3rem", color: "green" }}
          />
        </div>
        <h2 className="titlelogin">Đăng nhập</h2>
        <form>
          <div className="mb-2">
            {/* <label htmlFor="email" className="form-label">
              Email
            </label> */}
            <InputText
              placeholder="Email"
              id="email"
              className="form-control"
              type="email"
              name="email"
              onChange={handleEmailChange}
            />
            {email && !validateInput(email) ? (
              <p className="error-feedback">Email không đúng định dạng</p>
            ) : null}
          </div>
          <div className="mb-2">
            {/* <label htmlFor="password" className="form-label">
              Password
            </label> */}
            <div className="password-input-container">
              <InputText
                id="password"
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>

            {err && (
              <p data-testid="error" className="error-feedback">
                {err}
              </p>
            )}
            <Link to="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </Link>
          </div>
          <button
            disabled={!email || !password}
            onClick={handleClick}
            className="submit-btn"
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            {loading ? "Loading" : "Đăng nhập"}
          </button>
          <Link to="/register" className="create-account">
            <p>Bạn chưa có tài khoản. </p>
            <span> Đăng kí?</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;
