import { axiosReq, axiosRes } from "./axiosDefaults"


export const fetchMessages = async (userId = null) => {
  try {
    const url= userId
      ? `/direct-messages/${userId}/`
      : `/direct-messages/`;
    console.log("Fetching messags from fetchMessages url:", url)
    const response = await axiosReq.get(url);
    return response.data;
  } catch (error) {
    console.log("Error in fetchMessages:", error.response || error.message || error)
    return { results: [] };
  }
};

export const sendMessage = async (receiverId, content) => {
  console.log("Sending message to:", receiverId, "with:", content)
  try {
    const { data } = await axiosRes.post(`/direct-messages/`, {
      receiver: receiverId,
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