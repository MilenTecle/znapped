import { axiosReq, axiosRes } from "./axiosDefaults"


export const fetchMessages = async (id) => {
  const { data } = await axiosReq.get(`/direct-messages/?user_id=${id}`)
  return data;
};

export const sendMessage = async (receiverId, content) => {
  const { data } = await axiosRes.post(`/direct-messages/`, {
    receiver_id: receiverId,
    content,
  });
  return data;
};

export const markMessagesAsRead = async (messageIds) => {
  await axiosRes.patch(`/direct-messages/mark-as-read/`, {message_ids: messageIds})
};