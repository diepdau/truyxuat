import React, { useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../service/user_service.js";
import { fetchNotifications } from "../../service/Herd_data.js";
import { Toast } from "primereact/toast";

const NotificationBox = () => {
  const { token } = useContext(AuthContext);
  const toast = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNotifications(token);
        console.log(response);

        // Lấy 3 thông báo đầu tiên
        const firstThreeNotifications = response.slice(0, 3);

        firstThreeNotifications.forEach((notification) => {
          const herdNameMatch = notification.message.match(
            /Herd (\w+) has reached the harvest age\./
          );
          if (herdNameMatch) {
            const herdName = herdNameMatch[1];
            toast.current.show({
              severity: "success",
              summary: `Đàn ${herdName} đã đến tuổi thu hoạch`,
              life: 3000,
            });
          }
        });
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [token]);

  return <Toast className="toast" ref={toast} />;
};

export default NotificationBox;
