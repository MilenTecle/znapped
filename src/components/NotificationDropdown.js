import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import styles from "../styles/MoreDropdown.module.css";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const NotificationIcon = React.forwardRef(({ onClick, unreadCount }, ref) => (
  <div className={styles.IconWrapper}>
    <i
      className="fas fa-bell"
      ref={ref}
      onClick={onClick}
    />
    {unreadCount > 0 && (
      <Badge className={`${styles.badge} badge`}>
        {unreadCount}
      </Badge>
    )}
  </div>
));

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser)
        try {
          const { data } = await axiosReq.get("/notifications/");

          const generalNotifications = data.results.filter(
            (notification) => notification.type !== "message"
          );

          const unread = generalNotifications.filter((n) => !n.read).length;

          setNotifications(generalNotifications);
          setUnreadCount(unread);
        } catch (error) {
        }
    };
    fetchNotifications();
  }, [currentUser]);


  const markAsRead = async () => {
    try {
      if (unreadCount > 0) {
        await axiosReq.patch("/notifications/mark-as-read/");
        setUnreadCount(0);
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) => ({ ...n, read: true }))
        );
      }
    } catch (error) {
    }
  };


  const handleIconClick = async () => {
    markAsRead();
    history.push("/notifications")
  };


  return (
    <div
      className="ml-auto">
      <NotificationIcon
        onClick={handleIconClick}
        unreadCount={unreadCount}
      />
    </div>
  );
};

export default NotificationDropdown;