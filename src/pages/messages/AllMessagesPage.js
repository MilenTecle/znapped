import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMessages, markMessagesAsRead } from "../../api/messages";
import { useCurrentUser } from "../../contexts/CurrentUserContext";



const AllMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const currentUser = useCurrentUser;

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axiosReq.get("/direct-messages/");
        console.log("messages API response:", data.results);
        setMessages(data.results);
      } catch (error) {
        console.log("Error fetching messages:", error);
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