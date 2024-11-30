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
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
    {unreadCount > 0 && (
      <Badge className={`${styles.badge} badge`}>
        {unreadCount}
      </Badge>
    )}
  </div>
));

const MessageDropdown = ({ mobile }) => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    const loadMessages = async () => {
      if (currentUser)
        try {
          const  {data} = await axiosReq.get("/notifications/");
          console.log("messages API response:", data.results)

          const messageNotifications = data.results.filter(
            (notification) => notification.type === "message"
          );

          const unread = messageNotifications.filter((msg) => !msg.read).length;

          setMessages(messageNotifications);
          setUnreadCount(unread)
        } catch (error) {
          console.log("Error fetching messages:", error);
          setMessages([]);
          setUnreadCount(0);
        }
    };
    loadMessages();
  }, [currentUser]);


  const handlemarkAsRead = async () => {
    try {
      const undreadMessages = messages.filter((msg) => !msg.read).map((msg) => msg.id);
        await markMessagesAsRead(undreadMessages);
        setUnreadCount(0);
        setMessages((prevMessages) =>
          prevMessages.map((msg) => ({ ...msg, read: true }))
        );
    } catch (error) {
    }
  };

  const handleToggle = (isOpen) => {
    if (isOpen && unreadCount > 0) {
      handlemarkAsRead();
    }
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    if (mobile) {
      history.push("/direct-messages");
    };
  };


  if (mobile) {
    return (
      <div className="ml-auto">
        <MessageIcon
          onClick={handleIconClick}
          unreadCount={unreadCount} />
      </div>
    );
  }

  return (
    <Dropdown
      className="ml-auto"
      drop="left"
      onToggle={handleToggle}
    >
      <Dropdown.Toggle
        as={MessageIcon}
        unreadCount={unreadCount}
      >
      </Dropdown.Toggle>
      <Dropdown.Menu
        popperConfig={{ strategy: "fixed" }}
        className="text-center"
      >
        {messages.length ? (
          <>
            {messages.slice(0, 5).map((message) => (
              <Dropdown.Item
                key={message.id}
                href={`/direct-messages/${message.sender}`}
                className={styles.DropdownItem}
              >
                You have a new message from<strong>{message.sender_name}:</strong>
              </Dropdown.Item>
            ))}
            <Dropdown.Item href="/direct-messages" className={styles.ViewAll}>
              View all messages
            </Dropdown.Item>
          </>
        ) : (
          <Dropdown.Item
            className={styles.NoNotification}>
            No messages
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MessageDropdown;