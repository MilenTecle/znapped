import { useEffect, useState } from "react";
import { NotificationsDeleteDropdown } from '../../components/MoreDropdown';
import { axiosReq } from "../../api/axiosDefaults";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";


const DisplayNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    const fetchNotifications = async () => {
      try {
        // Make a GET request to retrieve all notifications
        const { data } = await axiosReq.get("/notifications/");

        // Filter out general notifications, excluding messages
        const notificationTypes = ["mention", "comment", "follow", "like"]

        const generalNotifications = data.results.filter(
          (notification) =>
            notificationTypes.includes(notification.type) &&
            notification.type !== "message"
        );

        // Update state with filtered notifications
        setNotifications(generalNotifications);

        // Mark notifications as read using a PATCH request
        await axiosReq.patch("/notifications/mark-as-read/")
      } catch (err) {
        console.error("Error marking notifications as read:", err);
      }
    };
    fetchNotifications();
  }, []);

  // Handles deletion of notifications
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to remove the specific notification
      await axiosReq.delete(`/notifications/${id}/`)

      // Update state by filtering out the deleted notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== id)
      );
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };


  return (
    <div>
      <h1>Your Notifications</h1>
      {notifications.length ? (
        <ListGroup variant="flush">
            {/* Map through the list of notifications */}
          {notifications.map((notification) => {
            // Determine the link destination based on notification type
            const href =
              notification.type === "follow"
                ? `/profiles/${notification.sender_profile_id}/` // Follow
                : ["like" ,"comment", "mention"].includes(notification.type)
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
                {/* Display a badge "new" for unread notifications */}
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