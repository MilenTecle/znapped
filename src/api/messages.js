import { axiosReq, axiosRes } from "./axiosDefaults"


export const fetchMessages = async (userId) => {
  console.log("Calling fetchMessages with userId", userId)
  try {
    const { data } = await axiosReq.get(`/direct-messages/${userId}/`);
    console.log("Response from API:", data);
    return data;
  } catch (error) {
    console.log("Error in fetchMessages:", error.response || error.message || error)
  }
};

export const sendMessage = async (receiverId, content) => {
  console.log("Sending message to:", receiverId, "with:", content)
  try {
    const { data } = await axiosRes.post(`/direct-messages/`, {
      receiver_id: receiverId,
      content,
    });
    return data;
  } catch (error) {
    console.log("Error in SendMessage:", error.response?.data || error.message)
  }
};

export const markMessagesAsRead = async (messageIds) => {
  await axiosRes.patch(`/direct-messages/mark-as-read/`, { message_ids: messageIds })
};