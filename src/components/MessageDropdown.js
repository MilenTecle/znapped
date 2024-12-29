import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import styles from "../styles/MoreDropdown.module.css";
import { markMessagesAsRead } from "../api/messages";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { NavLink } from "react-router-dom";

/**
 * The forwardRef is important!!
 * Dropdown needs access to the DOM node in order to position the Menu
 * A custom icon component to show the message icon with unread badge
 for direct messages
 * Event handler triggered on icon click.
 */
const MessageIcon = React.forwardRef(({ onClick, unreadCount }, ref) => (
  <NavLink
    to="/direct-messages"
    className={styles.NavLink}
    activeClassName={styles.Active}
    onClick={onClick}
    ref={ref}
  >
    <i
      className="fas fa-envelope" />
    <span className={styles.IconText}>Messages</span>
    {unreadCount > 0 && (
      <Badge className={`${styles.badge} badge`}>
        {unreadCount}
      </Badge>
    )}
  </NavLink>
));

/**
 * Handles the display and management of unread messages for the user
 */
const MessageDropdown = () => {
  const [messages, setMessages] = useState([]);
  // Tracks the number of unread messages
  const [unreadCount, setUnreadCount] = useState(0);
  // Fetches the current logged-in user
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    // Fetches messages from the API
    const loadMessages = async () => {
      if (currentUser)
        try {
          const { data } = await axiosReq.get("/notifications/");
          // Filter notifications of type "message"
          const messageNotifications = data.results.filter(
            (notification) => notification.type === "message"
          );
          // Calculate the number of undread messages
          const unreadMessages = messageNotifications.filter((msg) => !msg.read)
          // Update messages state
          setMessages(messageNotifications)
          // Updates unread count
          setUnreadCount(unreadMessages.length)
        } catch (error) {
          console.error("Error loading messages:", error)
        }
    };
    loadMessages();
  }, [currentUser]);

  /**
   * Marks all unread messages as 'read' by sending their IDs to the API.
   */
  const handlemarkAsRead = async () => {
    try {
      const unreadMessageIds = messages.filter((msg) => !msg.read).map((msg) => msg.id);
      if (unreadMessageIds.length > 0) {
        await markMessagesAsRead(unreadMessageIds);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            unreadMessageIds.includes(msg.id) ? { ...msg, read: true } : msg
          )
        )
        // Resets unread count
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking messages as read:", error)
    }
  };

  /**
   * Handles the click event on the message icon and navigates
   * to the messages Page.
   */
  const handleIconClick = async () => {
    await handlemarkAsRead();
    history.push("/direct-messages");
  };


  return (
      <MessageIcon
        onClick={handleIconClick}
        unreadCount={unreadCount}
      />
  );
};

export default MessageDropdown;