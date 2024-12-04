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
  const currentUser = useCurrentUser;

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axiosReq.get("/direct-messages/");
        setMessages(data.results);
      } catch (error) {
      }
    };

    getMessages();
  }, []);

  const handlemarkAsRead = async (message) => {
    if (!message.read) {
      await markMessagesAsRead([message.id]);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      )
    }
  };

  const handleDelete = async (id) => {
    console.log(`Handledelete triggered with ID: ${id}`)
    try {
      await axiosReq.delete(`/direct-messages/${id}/`)
      console.log(`Message with ID ${id} deleted`)
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id)
      );
    } catch (error) {
    }
  };

  return (
    <Container>
      <div className="overflow-auto mb-4">
        <h1 className="text-center my-4">Your Messages</h1>
        {messages.length > 0 ? (
          <ListGroup variant="flush" className="mb-4">
            {messages.map((message) => {
              const otherUser =
                currentUser.id === message.sender
                  ? message.receiver_name
                  : message.sender_name;

              return (
                <ListGroup.Item
                  key={message.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Link
                    to={`/direct-messages/${message.receiver || message.sender}`}
                    onClick={() => handlemarkAsRead(message)}
                  >
                    From: {otherUser}
                  </Link>
                  <br />
                  <small className="text-muted">
                    {message.created_at}
                  </small>
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