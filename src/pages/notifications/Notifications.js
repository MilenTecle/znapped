import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";


const DisplayNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axiosReq.get("/notifications/");
        setNotifications(data.results);
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
            <a href={`/posts/${notification.post_id}`}>
            {notification.message}
            </a>
            {notification.read ? null : <span className="badge">New</span>}
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