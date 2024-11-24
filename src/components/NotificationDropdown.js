import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const NotificationIcon = React.forwardRef(({ onClick, unreadCount }, ref) => (
  <div className={styles.IconWrapper}>
    <i
      className="fas fa-bell"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
    {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
  </div>
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
          console.log("Fetched notifications:", data.results)
          setNotifications(data.results);
          setUnreadCount(data.results.filter(n => !n.read).length);
        } catch (error) {
          console.log("Error fetching notifications:", error.response || error)
        }
    };
    fetchNotifications();
  }, [currentUser]);

  console.log("Unread count:", unreadCount)


  const markAsRead = async () => {
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

  const handleToggle = (isOpen) => {
    if (isOpen && unreadCount > 0) {
      markAsRead();
    }
  };


  return (
    <Dropdown
      className="ml-auto"
      drop="left"
      onToggle={handleToggle}
    >
      <Dropdown.Toggle
        as={NotificationIcon}
        unreadCount={unreadCount}
      >
      </Dropdown.Toggle>
      <Dropdown.Menu
        popperConfig={{ strategy: "fixed" }}
        className="text-center"
      >
        {notifications.length ? (
          <>
            {notifications.slice(0, 5).map((notification) => {
              const href =
                notification.type === "follow"
                  ? `/profiles/${notification.sender_profile_id}/`
                  : notification.post_id
                    ? `/posts/${notification.post_id}/`
                    : "#";

              return (
                <Dropdown.Item
                  key={notification.id}
                  href={href}
                  className={styles.DropdownItem}
                >
                  {notification.message}
                </Dropdown.Item>
              );
            })}
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