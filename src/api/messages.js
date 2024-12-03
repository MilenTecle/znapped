import { axiosReq, axiosRes } from "./axiosDefaults"


export const fetchMessages = async (id = null) => {
  try {
    const url = id ? `/direct-messages/${id}/` : `/direct-messages/`;
    const response = await axiosReq.get(url);
    return response.data;
  } catch (error) {
    console.log("Error in fetchMessages:", error.response || error.message || error)
    return { results: [] };
  }
};

export const sendMessage = async (receiverId, content) => {
  try {
    const { data } = await axiosRes.post(`/direct-messages/`, {
      receiver: receiverId,
      content: content,
    });
    return data;
  } catch (error) {
    console.log("Error in SendMessage:", error.response?.data || error.message)
  }
};

export const markMessagesAsRead = async (messageIds) => {
  console.log("Sent to mark messags as read:", messageIds)
  await axiosRes.patch(`/direct-messages/mark-as-read/`, { message_ids: messageIds })
};