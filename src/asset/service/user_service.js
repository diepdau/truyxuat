import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Toast } from "primereact/toast";
// import { useNavigate } from "react-router-dom";
export const AuthContext = createContext("");

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
    
  );

  const loginApi = async (inputs) => {
    // const res = await axios.post("/auth/login", inputs);
    const res = await axios.post("https://agriculture-traceability.vercel.app/api/v1/auth/login", inputs);
    const user = res.data.user;
    // setCurrentUser(user);
     setCurrentUser({ ...user, expirationTime: Date.now() + 24 * 60 * 60 * 1000 }); // Thêm thời gian hết hạn 24 giờ
    // setCurrentUser({ ...user, expirationTime: Date.now() + 5 * 60 * 1000 }); 
  };

  const logout = async (inputs) => {
    await axios.get("https://agriculture-traceability.vercel.app/api/v1/auth/logout",inputs);
    setCurrentUser(null);
  };



const getuserList = async () => {
    try {
        const res = await axios.get("https://agriculture-traceability.vercel.app/api/v1/users?limit=50");
        return res.data.users;
    } catch (error) {
        console.log(error)
    }
};

const createUserList = async () => {
    try {
        const res = await axios.post("https://agriculture-traceability.vercel.app/api/v1/users");
        console.log("Tạo user thanh cong");
        return res.data.users;
    } catch (error) {
        console.log(error)
    }
};
const getUser = async (userId) => {
    try {
        const res = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/users/${userId}`);
        console.log("lấy 1 user thanh cong");
        return res.data;
    } catch (error) {
        console.log(error)
    }
};
const updateUserInfo = async (data) => {
  try {
      const res = await axios.patch(`https://agriculture-traceability.vercel.app/api/v1/users/update-user`,data);
      console.log("Sửa user thanh cong");
      return res.data.users;
  } catch (error) {
      console.log(error)
  }
};
const changeUserPassword = async (data) => {
  try {
      const res = await axios.patch(`https://agriculture-traceability.vercel.app/api/v1/users/change-password`,data);
      console.log("Sửa password thanh cong");
      return res.data.users;
  } catch (error) {
      console.log(error)
  }
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
    <AuthContext.Provider value={{ currentUser, loginApi, logout ,getuserList,createUserList,getUser,updateUserInfo,changeUserPassword}}>
      {children}
    </AuthContext.Provider>
  );
};

