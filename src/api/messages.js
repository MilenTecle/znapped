import { axiosReq, axiosRes } from "./axiosDefaults"


export const fetchMessages = async (id = null) => {
  try {
    const url = id ? `/direct-messages/${id}/` : `/direct-messages/`;
    const response = await axiosReq.get(url);
    return response.data;
  } catch (error) {
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
  }
};

export const markMessagesAsRead = async (messageIds) => {
  await axiosRes.patch(`/direct-messages/mark-as-read/`, { message_ids: messageIds })
};