import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMessages } from "../../api/messages";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const AllMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const currentUser = useCurrentUser;

  useEffect(() => {
    const getMessages = async () => {
        try {
          const data  = await fetchMessages(currentUser.pk);
          console.log("Fetched messages:", data);
          setMessages(data.results.reverse());
        } catch (error) {
          console.log("Error fetching messages:", error);
          setMessages([]);
        }
      };

      if (currentUser && currentUser.pk) {
           getMessages();
      }

    }, [currentUser]);

  const groupedMessages = messages.reduce((acc, message) => {
    const key = message.sender_name === message.receiver_name
      ? message.sender_name
      : message.sender_name < message.receiver_name
      ? `${message.sender_name}-${message.receiver_name}`
      : `${message.receiver_name}-${message.sender_name}`;

    acc[key] = acc[key] || [];
    acc[key].push(message);
    return acc;
  }, {});

  return (
    <Container>
      <h1 className="text-center my-4">All Messages</h1>
      <div className="overflow-auto mb-4">
        {Object.keys(groupedMessages).length ? (
          <ul>
            {Object.entries(groupedMessages).map(([key, msgs]) => (
              <li key={key}>
                <Link to={`/direct-messages/${msgs[0].receiver}`}>
                  Conversation with {msgs[0].receiver_name}
                </Link>
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