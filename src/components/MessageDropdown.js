import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import styles from "../styles/MoreDropdown.module.css";
import { fetchMessages, markMessagesAsRead } from "../api/messages";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const MessageIcon = React.forwardRef(({ onClick, unreadCount }, ref) => (
  <div className={styles.IconWrapper}>
    <i
      className="fas fa-envelope"
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

const MessageDropdown = () => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    const loadMessages = async () => {
      if (currentUser)
        try {
          const { data } = await axiosReq.get("/notifications/");
          const messageNotifications = data.results.filter(
            (notification) => notification.type === "message"
          );

          const unreadMessages = messageNotifications.filter((msg) => !msg.read)
          setMessages(messageNotifications)
          setUnreadCount(unreadMessages.length)
        } catch (error) {
          console.log("Error fetching messages:", error);
        }
    };
    loadMessages();
  }, [currentUser]);


  const handlemarkAsRead = async () => {
    try {
      const undreadMessageIds = messages.filter((msg) => !msg.read).map((msg) => msg.id);
      if (undreadMessageIds.length > 0) {
        await markMessagesAsRead(undreadMessageIds);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            undreadMessageIds.includes(msg.id) ? { ...msg, read: true } : msg
          )
        )
        setUnreadCount(0);
      }
    } catch (error) {
    }
  };


  const handleIconClick = async () => {
    await handlemarkAsRead();
    history.push("/direct-messages");
  };


  return (
    <div
      className="ml-auto">
      <MessageIcon
        onClick={handleIconClick}
        unreadCount={unreadCount}
      />
    </div>
  );
};

export default MessageDropdown;