import { useEffect, useState } from "react";
import { fetchMessages, sendMessage, fetchUser } from "../../api/messages";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


const DisplayMessages = () => {
  const { id } = useParams();   // Get the user ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Fetch all messages with the selected user
    const retrieveMessages = async () => {
      if (!id) {
        return;
      }
      try {
        // API call to fetch messages and user details at the same time
        const [messagesData, userData] = await Promise.all([
          fetchMessages(id),
          fetchUser(id),
        ]);
        // Reverse messages for ordering
        setMessages(messagesData.results.reverse());
        // Set username state and fallback if data is missing
        setUsername(userData?.owner || `User ${id}`)
      } catch (error) {
        console.error("Error fetching messages or user details:", error);
      }
    };

    retrieveMessages();
  }, [id]);


  // Handling sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      return; // Prevent sending empty messages
    }
    try {
      // API call to send message
      const message = await sendMessage(id, newMessage);
      // Add new message to state
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    } catch (error) {
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Conversation with {username || `User ${id}`}</h1>
      <div className="overflow-auto mb-4">
        {/* Loop through and display all messages */}
        {messages.map((message) =>
          message && message.sender_name ? (
            <Row
              key={message.id}
              className={`my-2 ${message.sender_name === currentUser?.username
                ? 'justify-content-end'
                : 'justify-content-start'
                }`}
            >
              <Col xs={10} md={8} lg={6}>
                <Card
                  className={
                    message.sender_name === currentUser?.username
                      ? 'bg-primary text-white'
                      : 'bg-light'
                  }
                >
                  <Card.Body>
                    {/* Display message sender and content */}
                    <strong>{message.sender_name}:</strong> {message.content}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : null
        )}
      </div>
      <Form>
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="messageInput">
              <Form.Control
                as="textarea"
                rows={2}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleSendMessage}
              className="float-end"
              disabled={!newMessage.trim()}
            >
              Send
            </Button>
          </Col>
      </Form>
    </Container>
  );
};

export default DisplayMessages;