import { useEffect, useState } from "react";
import styles from "../../styles/MoreDropdown.module.css";
import { axiosReq } from "../../api/axiosDefaults";


const DisplayNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axiosReq.get("/notifications/");
        setNotifications(data.results);
        await axiosReq.patch("/notifications/mark-as-read/")
      } catch (error) {
        console.log("Error fetching notifications:", error)
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Your Notifications</h1>
      {notifications.length ? (
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <a href={notification.post_id? `/posts/${notification.post_id}`: "#"}>
            {notification.message}
            </a>
            {!notification.read && <span className={styles.badge}>New</span>}
          </li>
        ))}
      </ul>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default DisplayNotifications;