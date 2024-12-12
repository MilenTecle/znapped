import { axiosReq, axiosRes } from "./axiosDefaults"

/**
 * Fetch messages from the API
 * If an ID is provided, fetch a specific direct message by ID
 * If no ID is provided, fetch all direct messages (for the MessagePage)
 * @param - The optional ID of a specific message to fetch.
 * @returns - The data containing the list of messages or the specific message.
 */
export const fetchMessages = async (id = null) => {
  try {
    // Construct the URL based on wether and ID is provided
    const url = id ? `/direct-messages/${id}/` : `/direct-messages/`;
    const response = await axiosReq.get(url);
    return response.data;
  } catch (error) {
    // In case of an error, return an empty result set
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
  }
};

// Fetch a specific user's profile details from the API.
export const fetchUser = async(userId) => {
  try {
    const { data } = await axiosReq.get(`/profiles/${userId}/`);
    // Return the fetched user profile data.
    return data;
  } catch (error) {
  }
}

/**
 * Mark specific messages as read by sending their IDs to the API.
 * @param {*} messageIds - An array of message IDs to mark as read.
 */
export const markMessagesAsRead = async (messageIds) => {
    // Perfom a PATCH request do update the 'read' status of messages
  await axiosRes.patch(`/direct-messages/mark-as-read/`, { message_ids: messageIds })
};