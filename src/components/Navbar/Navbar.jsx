import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { Menu } from "primereact/menu";
import imgadmin from "../../asset/Img/Desktop/adminName.png";
import { classNames } from "primereact/utils";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../asset/service/user_service.js";
import Sidebar from "../Sidebar/Sidebar.js";
import { SidebarContext } from "../Sidebar/SidebarContext.js"; // Import SidebarContext
import Observer from "../../asset/Design/Observable/Observer.jsx";
import NotificationBox from "../Notification/Notification.jsx";
import { Badge } from "primereact/badge";
export default function Navbar(ref) {
  const { currentUser, logout, token } = useContext(AuthContext);
  const { isVisibleSidebar, setIsVisibleSidebar } = useContext(SidebarContext); // Use SidebarContext
  const userName = currentUser && currentUser.name ? currentUser.name : "Guest";
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(3);

  const handleNotificationCountChange = (count) => {
    setNotificationCount(count);
  };
  const handleUpdateUserName = async (userId) => {
    try {
      await logout(token);
      Observer.notify(`Đăng xuất thành công`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  let items = [
    {
      template: (item, options) => {
        return currentUser && currentUser.role === "admin" ? (
          <Link className="link" to={`/user/my-profile`}>
            Hồ sơ của tôi
          </Link>
        ) : (
          <Link className="link" to={`/user/${currentUser.userId}`}>
            Hồ sơ của tôi
          </Link>
        );
      },
    },
    {
      template: (item, options) =>
        currentUser.role === "admin" ? (
          <Link className="link" to="/userList">
            Quản lý tài khoản
          </Link>
        ) : null,
    },
    { separator: true },
    {
      template: (item, options) => (
        <p
          className="logout"
          onClick={() => handleUpdateUserName(currentUser.userId)}
        >
          Đăng xuất
        </p>
      ),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 450) {
        setIsVisibleSidebar(false);
      } else {
        setIsVisibleSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsVisibleSidebar]);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setNotificationCount(0); 
  };
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div>
      <div className="layout-topbar">
        <div className="layout-topbar-logo">
          <i
            className="pi pi-bars"
            id="sidebar-close"
            style={{ cursor: "pointer" }}
            onClick={() => setIsVisibleSidebar((prevVisible) => !prevVisible)}
          ></i>

          <h1 style={{ color: "green" }}>Farming</h1>
        </div>

        <div className={classNames("layout-topbar-menu")}>
          <div
            className="layout-topbar-logo"
           
          ><i onClick={toggleNotifications} className="pi pi-bell p-overlay-badge notification-icon">

          <Badge  value={notificationCount}></Badge>
      </i>

            <img
             onClick={() => setVisible((prevVisible) => !prevVisible)}
              style={{ cursor: "pointer" }}
              src={imgadmin}
              width="42.22px"
              height={"auto"}
              alt="imgAdmin"
            />
            <span
             onClick={() => setVisible((prevVisible) => !prevVisible)}
              style={{ color: "black", direction: "none", cursor: "pointer" }}
            >
              {userName}
            </span>
          </div>
        </div>
      </div>

      {visible && (
        <div className="userOptions">
          <Menu
            model={items}
            onClick={(e) => {
              setVisible(false);
            }}
          />
        </div>
      )}
      {isVisibleSidebar && <Sidebar />}
      {showNotifications && ( <NotificationBox onNotificationCountChange={handleNotificationCountChange}/>)}
    </div>
  );
}