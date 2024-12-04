import { useEffect, useState } from "react";
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
  const [newMessage, setNewMessage] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const retrieveMessages = async () => {
      if (!id) {
        return;
      }
      try {
        const data = await fetchMessages(id);
        setMessages(data.results.reverse());
      } catch (error) {
      }
    };
    retrieveMessages();
  }, [id]);

  const username =
    messages.length > 0
      ? currentUser?.pk === messages[0].sender
        ? messages[0].receiver_name
        : messages[0].sender_name
      : `User ${id}`;

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }
    try {
      const message = await sendMessage(id, newMessage);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    } catch (error) {
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Conversation with {username}</h1>
      <div className="overflow-auto mb-4">
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
      </Form>
    </Container>
  );
};

export default DisplayMessages;