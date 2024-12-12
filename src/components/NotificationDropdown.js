import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import styles from "../styles/MoreDropdown.module.css";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router";


/**
 * The forwardRef is important!!
 * Dropdown needs access to the DOM node in order to position the Menu
 * A custom icon component to show the beöö icon with unread badge
 for notifications.
 * Event handler triggered on icon click.
 */
const NotificationIcon = React.forwardRef(({ onClick, unreadCount }, ref) => (
  <div className={styles.IconWrapper} onClick={onClick} ref={ref}>
    <i
      className="fas fa-bell" />
      <span className={styles.IconText}>Notifications</span>
    {unreadCount > 0 && (
      <Badge className={`${styles.badge} badge`}>
        {unreadCount}
      </Badge>
    )}
  </div>
));

/**
 * Fetches, displays, and manages user notifications.
 * Unread notifications are highlighted and marked as read when
 * the user clicks on the icon.
 */
const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = useCurrentUser();
  const history = useHistory();

  /**
   * Fetches general notifications (messages excluded) from the API.
   * Filters unread notifications and updates the unread count.
   */
  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser)
        try {
          const { data } = await axiosReq.get("/notifications/");

          const generalNotifications = data.results.filter(
            (notification) => notification.type !== "message"
          );

          // Calculate the number of unread notifications
          const unread = generalNotifications.filter((n) => !n.read).length;

          //Update notifications state
          setNotifications(generalNotifications);
          // Update unread count
          setUnreadCount(unread);
        } catch (error) {
        }
    };
    fetchNotifications();
  }, [currentUser]);

/**
 * Marks all unread notifications as 'read' via an API request.
 * Updates local state to reflect the changes.
 */
  const markAsRead = async () => {
    try {
      if (unreadCount > 0) {
        await axiosReq.patch("/notifications/mark-as-read/");
        setUnreadCount(0);
        // Update notifications state to mark all as read
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) => ({ ...n, read: true }))
        );
      }
    } catch (error) {
    }
  };

/**
 * Marks notifications as read and navigates user to the
 * notifications page.
 */
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