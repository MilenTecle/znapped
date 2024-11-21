import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { fetchMessages, markMessagesAsRead } from "../api/messages";


const MessageDropdown = () => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadMessages = async () => {
        try {
          const { data } = await fetchMessages();
          setMessages(data.results);
          setUnreadCount(data.results.filter((msg) => !msg.read).length);
        } catch (error) {
          console.log("Error fetching messages:", error)
        }
    };
    loadMessages();
  }, []);


  const handlemarkAsRead = async () => {
    const unreadMessages = messages.filter((msg) => !msg.read).map((msg) => msg.id);
    if (unreadMessages.length) {
      await markMessagesAsRead(unreadMessages);
      setUnreadCount(0);
      setMessages((prevMessages) =>
        prevMessages.map((msg) => ({...msg, read: true}))
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
        as="div"
        className={styles.IconWrapper}
      >
        <i className="fas fa-envelope" />
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
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
                href={`/messages/${message.id}`}
                className={styles.DropdownItem}
              >
                <strong>{message.sender_name}:</strong> {message.content.slice(0, 30)}
              </Dropdown.Item>
            ))}
            <Dropdown.Item href="/messages" className={styles.ViewAll}>
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