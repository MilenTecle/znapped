import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMessages } from "../../api/messages";
import { useCurrentUser } from "../../contexts/CurrentUserContext";



const AllMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const currentUser = useCurrentUser;

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axiosReq.get("/direct-messages/");
        console.log("Fetched messages:", data);
        setMessages(data.results);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    getMessages();
  }, []);

  return (
    <Container>
      <div className="overflow-auto mb-4">
        <h1 className="text-center my-4">Your Messages</h1>
        {messages.length > 0 ? (
          <ListGroup variant="flush" className="mb-4">
            {messages.map((message) => (
              <ListGroup.Item
                key={message.id}
                className="d-flex justify-content-between align-items-center"
              >
                <a href={`/direct-messages/${message.receiver || message.sender}`}>
                  From: {message.sender_name}
                </a>
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
            ))}
          </ListGroup>
        ) : (
          <p>No messages found</p>
        )}
      </div>
    </Container>
  );
};

export default AllMessagesPage;