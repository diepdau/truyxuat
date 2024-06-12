// import React, { useEffect, useContext, useState } from "react";
// import { AuthContext } from "../../service/user_service.js";
// import { fetchNotifications } from "../../service/Herd_data.js";
// import "react-toastify/dist/ReactToastify.css";
// import Observer from "../../Design/Observable/Observer.jsx";

// const NotificationBox = () => {
//   const { token } = useContext(AuthContext);
//   const [triggerFetch, setTriggerFetch] = useState(false); // Sử dụng state để ghi nhận sự thay đổi

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetchNotifications(token);
//         console.log(response);
//         const firstThreeNotifications = response.slice(0, 2);

//         firstThreeNotifications.forEach((notification) => {
//           const herdNameMatch = notification.message.match(
//             /Herd (\w+) has reached the harvest age\./
//           );
//           if (herdNameMatch) {
//             const herdName = herdNameMatch[1];
//             Observer.notify(`Đàn ${herdName} đã đến tuổi thu hoạch`);
//           }
//         });
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchData();

//     const interval = setInterval(() => {
//       setTriggerFetch((prev) => !prev);
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [token, triggerFetch]);

//   return null;
// };

// export default NotificationBox;
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../asset/service/user_service.js";
import { fetchNotifications } from "../../asset/service/Herd_data.js";
import "react-toastify/dist/ReactToastify.css";
import "./Notification.css"
const NotificationBox = ( { onNotificationCountChange }) => {
  const { token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNotifications(token);
        console.log(response);
        // const response = [
        //   { message: "Herd A has reached the harvest age." },
        //   { message: "Herd B has reached the harvest age." },
        //   { message: "Herd C has reached the harvest age." },
        // ];
        const newNotifications = response.slice(0, 3).map((notification) => {
          const message = notification.message;
          let translatedMessage = message;
          if (/Herd (\w+) has reached the harvest age\./.test(message)) {
            const herdNameMatch = message.match(/Herd (\w+) has reached the harvest age\./);
            if (herdNameMatch) {
              const herdName = herdNameMatch[1];
              translatedMessage = `Đàn ${herdName} đã đến tuổi thu hoạch`;
            }
          }
          return { message: translatedMessage };
        });
        

        setNotifications(newNotifications);
        onNotificationCountChange(newNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setTriggerFetch((prev) => !prev);
    }, 60000);

    return () => clearInterval(interval);
  }, [token, triggerFetch]);

  return (
    <div className="notification-container">
    <div className="notification-header">Thông báo</div>
    <div className="separator"></div>
    <ul className="notification-list">
      {notifications.map((notification, index) => (
        <li key={index} className="notification-item">
          {notification.message}
        </li>
      ))}
    </ul>
  </div>
  );
};
 export default NotificationBox;
