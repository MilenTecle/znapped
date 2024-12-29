import { axiosReq, axiosRes } from "./axiosDefaults"

/**
 * Fetch messages from the API
 * If an ID is provided, fetch the direct messages between current user and
 * another user.
 * If no ID is provided, fetch all direct messages (for the MessagePage)
 * @returns - The data containing the list of messages or the specific message.
 */
export const fetchMessages = async (userId = null) => {
  try {
    // Construct the URL based on wether and ID is provided
    const url = userId ? `/direct-messages/?user_id=${userId}` : `/direct-messages/`;
    const response = await axiosReq.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch messages:", error)
    return { results: [] };
  }
};

/**
 * Send a direct message to a specific user.
 * @param {*} receiverId - The ID of the user to receive the message
 * @param {*} content - The content of the message
 * @returns - The data containing the sent message details,
 */
export const sendMessage = async (receiverId, content) => {
  try {
    // Perform a POST request to create a new direct message
    const { data } = await axiosRes.post(`/direct-messages/`, {
      receiver: receiverId,
      content: content,
    });
    return data;
  } catch (error) {
    console.error("Error sending message:", error)
  }
};

// Fetch a specific user's profile details from the API.
export const fetchUser = async (profileId) => {
  try {
    const { data } = await axiosReq.get(`/profiles/${profileId}/`);
    // Return the fetched user profile data.
    return { username: data.owner };
  } catch (error) {
    console.error("Failed to mark messages as read:", error)
  }
}

/**
 * Mark specific messages as read by sending their IDs to the API.
 * @param {*} messageIds - An array of message IDs to mark as read.
 */
export const markMessagesAsRead = async (messageIds) => {
  try {
    // Perform a PATCH request do update the 'read' status of messages
    await axiosRes.patch(`/direct-messages/mark-as-read/`, { message_ids: messageIds })
  } catch (error) {
    console.error("Failed to mark messages as read:", error)
  }
};