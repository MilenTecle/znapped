import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { fetchMessages, markMessagesAsRead } from "../api/messages";
import { useCurrentUser } from "../contexts/CurrentUserContext";


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
    {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
  </div>
));

const MessageDropdown = () => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const loadMessages = async () => {
      if (!currentUser) {
        console.log("No current user, skipping fetch")
        return;
      }
        try {
          const data  = await fetchMessages(currentUser.pk);
          console.log("Fetched messages:", data);

          const results = data?.results || [];
          setMessages(results);
          setUnreadCount(results.filter((msg) => !msg.read).length);
        } catch (error) {
          console.log("Error fetching messages:", error);
          setMessages([]);
          setUnreadCount(0);
        }
      };
      loadMessages();
    }, [currentUser]);


  const handlemarkAsRead = async () => {
    const unreadMessages = messages.filter((msg) => !msg.read).map((msg) => msg.id);
    if (unreadMessages.length) {
      await markMessagesAsRead(unreadMessages);
      setUnreadCount(0);
      setMessages((prevMessages) =>
        prevMessages.map((msg) => ({ ...msg, read: true }))
      )
    }
  };

  const handleToggle = (isOpen) => {
    if (isOpen && unreadCount > 0) {
      handlemarkAsRead();
    }
  };


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