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
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser)
      try {
        console.log("Fetching notifications...");
        const { data } = await axiosReq.get("/notifications/");
        console.log("Notifications fetched", data)
        setNotifications(data.results);
      } catch (error) {
        console.log("Error fetching notifications:", error.response || error)
      }
    };
    fetchNotifications();
  }, [currentUser]);


  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu
       popperConfig={{ strategy: "fixed" }}
        className="text-center">
          {notifications.length ? (
            notifications.map((notification) => (
        <Dropdown.Item
          key={notification.id}
          href={`/posts/${notification.post_id}`}
          className={styles.DropdownItem}
        >
          {notification.message}
        </Dropdown.Item>
        ))
      ) : (
        <Dropdown.Item
          className={styles.NoNotification}>
            No notification
        </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;