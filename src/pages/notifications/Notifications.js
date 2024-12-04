import { useEffect, useState } from "react";
import styles from "../../styles/MoreDropdown.module.css";
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
          (notification) => notification.type !== "message"
        );

        setNotifications(generalNotifications);
        await axiosReq.patch("/notifications/mark-as-read/")
      } catch (error) {
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Your Notifications</h1>
      {notifications.length ? (
        <ListGroup variant="flush">
          {notifications.map((notification) => (
            <ListGroup.Item
              key={notification.id}
              className="d-flex justify-content-between align-items-center"
            >
              <a href={notification.post_id ? `/posts/${notification.post_id}` : "#"}>
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
              </ListGroup.Item>
          ))}
          </ListGroup>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default DisplayNotifications;