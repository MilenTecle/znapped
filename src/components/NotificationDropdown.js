import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-bell"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser)
        try {
          const { data } = await axiosReq.get("/notifications/");
          setNotifications(data.results);
          setUnreadCount(data.results.filter(n => !n.read).length);
        } catch (error) {
          console.log("Error fetching notifications:", error.response || error)
        }
    };
    fetchNotifications();
  }, [currentUser]);


  const markAsRead= async () => {
    try {
      await axiosReq.patch("/notifications/mark-as-read/");
      setUnreadCount(0);
      setNotifications(prevNotifications =>
        prevNotifications.map(n => ({ ...n, read: true }))
      );
    } catch (error) {
      console.log("Error marking notificaitons as read:", error)
    }
  };


  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} onClick={markAsRead}>
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </Dropdown.Toggle>
      <Dropdown.Menu
        popperConfig={{ strategy: "fixed" }}
        className="text-center">
        {notifications.length ? (
          <>
            {notifications.slice(0, 5).map((notification) => (
              <Dropdown.Item
                key={notification.id}
                href={`/posts/${notification.post_id}`}
                className={styles.DropdownItem}
              >
                {notification.message}
              </Dropdown.Item>
            ))}
            <Dropdown.Item href="/notifications" className={styles.ViewAll}>
              View all notifications
            </Dropdown.Item>
          </>
        ) : (
          <Dropdown.Item
            className={styles.NoNotification}>
            No notifications
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;