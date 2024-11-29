import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import styles from "../../styles/MessagesPage.module.css";
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
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <a href={`/direct-messages/${message.receiver || message.sender}`}>
                  From: {message.sender_name}
                </a>
                {!message.read && <span className={styles.badge}>New</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages found</p>
        )}
      </div>
      </Container>
  );
};

export default AllMessagesPage;