import { useEffect, useState } from "react";
import styles from "../../styles/MessagesPage.module.css";
import { fetchMessages, sendMessage } from "../../api/messages";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


const DisplayMessages = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const retrieveMessages = async () => {
      if (!id) {
        console.log("No ID, skipping fetch")
        return;
      }
      console.log("Fetching messages for ID:", id)
      try {
        const data = await fetchMessages(id);
        console.log("Fetched messages:", data)
        setMessages(data.results);
      } catch (error) {
        console.log("Error loading messages:", error)
      }
    };
    retrieveMessages();
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      console.log("Cannot send an empty message.");
      return;
    }
    try {
      console.log("Receiver id", id, "Message content", newMessage)
      const message = await sendMessage(id, newMessage);
      console.log("Message sent", message)
      setMessages((prevMessages) => [message, ...prevMessages]);
      setNewMessage("");
    } catch (error) {
      console.log("Error sending message", error)
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Conversation with {id}</h1>
      <div className="overflow-auto mb-4">
        {messages.map((message) =>
          message && message.sender_name ? (
            <Row
              key={message.id}
              className={`my-2 ${message.sender_name === currentUser.username ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <Col xs={10} md={8}>
                <Card className={message.sender_name === currentUser.username ? 'bg-primary text-white' : 'bg-light'}>
                  <Card.Body>
                    <strong>{message.sender_name}:</strong> {message.content}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : null
        )}
      </div>
      <Form>
        <Form.Group controlId="messageInput">
          <Form.Control
            as="textarea"
            rows={2}
            vale={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSendMessage}
          className="float-end"
        >
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default DisplayMessages;