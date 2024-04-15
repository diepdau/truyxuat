import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Login/Login.css";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const initFormValue = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};
export default function RegisterPage() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [err, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        await axios.post("/auth/register", {
          first_name: formValue.first_name,
          last_name: formValue.last_name,
          email: formValue.email,
          password: formValue.password,
        });
        navigate("/");
      } catch (err) {
        setError(err.response.data.msg);
      }

  };
  const navigate = useNavigate();
  return (
    <div className="register-page">
      <div className="register-form-container">
      <div className="branding">
          <i className="pi pi-spin pi-slack" alt="Logo" style={{ fontSize: '3rem' ,color: 'green'}} />
          {/* <h1 >LaFarm</h1> */}
        </div>
        <h1 className="titlelogin">Đăng kí</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="first-name" className="form-label">
              Họ
            </label>
            <input
              id="first-name"
              className="form-control"
              type="text"
              name="first_name"
              value={formValue.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="last-name" className="form-label">
              Tên
            </label>
            <input
              id="last-name"
              className="form-control"
              type="text"
              name="last_name"
              value={formValue.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email hoặc số điện thoại
            </label>
            <input
              id="email"
              className="form-control"
              type="text"
              name="email"
              value={formValue.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <div className="password-input-container">
              <input
                id="password"
                className="form-control"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValue.password}
                onChange={handleChange}
              />
              <div className="toggle-password" onClick={toggleShowPassword}>
                {/* <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} /> */}
              </div>
            </div>
            <div className="text-note">Nhập 6 kí tự trở lên</div>
          </div>
          {err && <p className="error-feedback">{err}</p>}
          <button type="submit" className="submit-btn">
            Đăng kí
          </button>
          
          <Link to="/login" className="create-account">
            <p>Bạn đã có tài khoản. </p>
            <span> Đăng nhập?</span>{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}
