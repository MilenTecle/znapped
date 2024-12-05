import { useEffect, useState } from "react";
import styles from "../../styles/MoreDropdown.module.css";
import { NotificationsDeleteDropdown } from '../../components/MoreDropdown';
import { axiosReq } from "../../api/axiosDefaults";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";


const DisplayNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axiosReq.get("/notifications/");

        const generalNotifications = data.results.filter(
          (notification) => notification.type === "mention" || notification.type !== "message"
        );

        setNotifications(generalNotifications);
        await axiosReq.patch("/notifications/mark-as-read/")
      } catch (error) {
      }
    };
    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    console.log(`Handledelete triggered with ID: ${id}`)
    try {
      await axiosReq.delete(`/notifications/${id}/`)
      console.log(`Notification with ID ${id} deleted`)
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== id)
      );
    } catch (error) {
    }
  };


  return (
    <div>
      <h1>Your Notifications</h1>
      {notifications.length ? (
        <ListGroup variant="flush">
          {notifications.map((notification) => {
            const href =
              notification.type === "follow"
                ? `/profiles/${notification.sender_profile_id}/`
                : notification.type === "mention" && notification.post_id
                ? `/posts/${notification.post_id}/`
                : "#";
            return (
              <ListGroup.Item
                key={notification.id}
                className="d-flex justify-content-between align-items-center"
              >
                <a href={href}>
                  {notification.message}
                </a>
                <small className="text-muted">
                  {notification.created_at}
                </small>
                {!notification.read && (
                  <Badge bg="primary" pill>
                    New
                  </Badge>
                )}
                <NotificationsDeleteDropdown
                  handleDelete={() => handleDelete(notification.id)}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default DisplayNotifications;