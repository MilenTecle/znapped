import { useEffect, useState } from "react";
import styles from "../../styles/MoreDropdown.module.css";
import { fetchMessages, sendMessage } from "../../api/messages";
import { useParams } from "react-router-dom";


const displayMessages = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    const retrieveMessages = async () => {
      try {
        const data = await fetchMessages(userId);
        setMessages(data.results);
      } catch (error) {
        console.log("Error loading messages:", error)
      }
    };
    retrieveMessages();
  }, [userId]);

  const handleSendMessage = async () => {
    try {
      const message = await sendMessage(userId, newMessage);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    } catch (error) {
      console.log("Error sending message", error)
    }
  };

  return (
    <div>
      <h1>Conversation</h1>
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.sender_name}:</strong> {message.content}
        </div>
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

export default displayMessages;