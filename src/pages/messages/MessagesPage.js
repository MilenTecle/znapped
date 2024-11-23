import { useEffect, useState } from "react";
import styles from "../../styles/MoreDropdown.module.css";
import { fetchMessages, sendMessage } from "../../api/messages";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


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
        setMessages(data.results || []);
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
    <div>
      <h1>Conversation with User {id}</h1>
      {messages.map((message) => (
        message && message.sender_name ? (
        <div key={message.id}>
          <strong>{message.sender_name}:</strong> {message.content}
        </div>
        ) : null
      ))}
      <div>
        <textarea
          vale={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DisplayMessages;