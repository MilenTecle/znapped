import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import styles from "../styles/MoreDropdown.module.css";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

/**
 * The forwardRef is important!!
 * Dropdown needs access to the DOM node in order to position the Menu
 * A custom icon component to show the beöö icon with unread badge
 for notifications.
 * Event handler triggered on icon click.
 */
const NotificationIcon = React.forwardRef(({ onClick, unreadCount }, ref) => (
  <NavLink
    to="/notifications"
    className={styles.NavLink}
    activeClassName={styles.Active}
    onClick={onClick}
    ref={ref}
  >
      <i
        className="fas fa-bell" />
      <span className={styles.IconText}>Notifications</span>
      {unreadCount > 0 && (
        <Badge className={`${styles.badge} badge`}>
          {unreadCount}
        </Badge>
      )}
  </NavLink>
));

/**
 * Fetches, displays, and manages user notifications.
 * Unread notifications are highlighted and marked as read when
 * the user clicks on the icon.
 */
const NotificationDropdown = () => {
  const [, setNotifications] = useState([]);
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
          console.log("Fetched notificaions", data.results)
          const notificationTypes = ["mention", "comment", "follow", "like"]

          const generalNotifications = data.results.filter(
            (notification) =>
              notificationTypes.includes(notification.type) &&
              notification.type !== "message"
          );
          console.log("Fetched notifications:", data.results)

          // Calculate the number of unread notifications
          const unread = generalNotifications.filter((n) => !n.read).length;

          //Update notifications state
          setNotifications(generalNotifications);
          // Update unread count
          setUnreadCount(unread);
          console.log("Updated Notifications state:", generalNotifications)
          console.log("Unread count:", unread)
        } catch (error) {
          console.log("Error fetching notifcations:", error)
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
      <NotificationIcon
        onClick={handleIconClick}
        unreadCount={unreadCount}
      />
  );
};

export default NotificationDropdown;