import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const loginApi = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    const user = res.data.user;
    setCurrentUser(user);
  };

  const logout = async (inputs) => {
    await axios.get("/auth/logout",inputs);
    setCurrentUser(null);
  };
const getuserList = async () => {
    try {
        const res = await axios.get("/users");
        return res.data.users;
    } catch (error) {
        console.log(error)
    }
};

const createUserList = async () => {
    try {
        const res = await axios.post("/users");
        console.log("Tạo user thanh cong");
        return res.data.users;
    } catch (error) {
        console.log(error)
    }
};
const getUser = async (userId) => {
    try {
        const res = await axios.get(`/users/${userId}`);
        console.log("lấy 1 user thanh cong");
        return res.data;
    } catch (error) {
        console.log(error)
    }
};
const updateUserInfo = async (data) => {
  try {
      const res = await axios.patch(`/users/update-user`,data);
      console.log("Sửa user thanh cong");
      return res.data.users;
  } catch (error) {
      console.log(error)
  }
};
const changeUserPassword = async (data) => {
  try {
      const res = await axios.patch(`/users/change-password`,data);
      console.log("Sửa password thanh cong");
      return res.data.users;
  } catch (error) {
      console.log(error)
  }
};
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, loginApi, logout ,getuserList,createUserList,getUser,updateUserInfo,changeUserPassword}}>
      {children}
    </AuthContext.Provider>
  );
};

