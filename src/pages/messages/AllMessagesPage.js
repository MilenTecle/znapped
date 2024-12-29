import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { NotificationsDeleteDropdown } from '../../components/MoreDropdown';
import { axiosReq } from "../../api/axiosDefaults";
import { markMessagesAsRead } from "../../api/messages";
import { useCurrentUser } from "../../contexts/CurrentUserContext";



const AllMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const currentUser = useCurrentUser();

  // Fetch all direct messages on component mount
  useEffect(() => {
    let isMounted = true;

    const getMessages = async () => {
      if (!currentUser?.pk) {
        return
      }
      try {
        const { data } = await axiosReq.get("/direct-messages/");

        const filteredMessages = data.results
          .filter((message) => message.receiver === currentUser.pk)
          .reverse();

        if (isMounted) {
           setMessages(filteredMessages);
        }

      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.pk]);

  // Mark a message as read
  const handlemarkAsRead = async (message) => {
    if (!message.read) {
      // API call to mark messages as read
      await markMessagesAsRead([message.id]);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      )
    }
  };

  // Handles deletion of a message
  const handleDelete = async (id) => {
    try {
      // API call to delete a message
      await axiosReq.delete(`/direct-messages/${id}/`)
      setMessages((prevMessages) =>
        // Remove message from state
        prevMessages.filter((msg) => msg.id !== id)
      );
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  return (
    <Container>
      <div className="overflow-auto mb-4">
        <h1 className="text-center my-4">Your Messages</h1>
        {messages.length > 0 ? (
          <ListGroup variant="flush" className="mb-4">
            {messages.map((message) => {
              // Determine the other user involved in the message
              const otherUser =
                currentUser.pk === message.sender
                  ? message.receiver_name
                  : message.sender_name;

              return (
                <ListGroup.Item
                  key={message.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Link
                    to={`/direct-messages/${
                      currentUser.pk === message.sender ? message.receiver : message.sender}`}
                    onClick={() => handlemarkAsRead(message)}
                  >
                    From: {otherUser}
                  </Link>
                  <br />
                  <small className="text-muted">
                    {message.created_at}
                  </small>
                  {/* Badge for unread messages */}
                  {!message.read && (
                    <Badge bg="primary" pill>
                      New
                    </Badge>
                  )}
                  <NotificationsDeleteDropdown
                    handleDelete={() => handleDelete(message.id)}
                  />
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        ) : (
          <p>No messages found</p>
        )}
      </div>
    </Container>
  );
};

export default AllMessagesPage;