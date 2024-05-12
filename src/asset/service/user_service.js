import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
export const AuthContext = createContext("");

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);

  const loginApi = async (inputs) => {
    try {
      const res = await axios.post("https://agriculture-traceability.vercel.app/api/v1/auth/login", inputs);
      const user = res.data.user;
      const accountToken = res.data.token;

      // Lưu user và token vào state và localStorage
      setCurrentUser({ ...user, expirationTime: Date.now() + 24 * 60 * 60 * 1000 });
      setToken(accountToken);
      localStorage.setItem("userToken", accountToken);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async (inputs) => {
    await axios.get("https://agriculture-traceability.vercel.app/api/v1/auth/logout", inputs);
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const tokenExpirationTime = currentUser?.expirationTime;
    const currentTime = Date.now();

    if (tokenExpirationTime && currentTime > tokenExpirationTime) {
      alert("Đã hết thời gian đăng nhập");
      logout();
      // Đăng xuất nếu token đã hết hạn
    }
  }, [currentUser, logout]);

  return (
    <AuthContext.Provider value={{ currentUser, token, loginApi, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

