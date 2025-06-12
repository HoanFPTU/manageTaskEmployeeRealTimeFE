import {
  getDatabase,
  ref,
  get,
  set,
  push,
  child,
  update,
} from "firebase/database";
import { db } from "./firebase";

export const APIStartConversation = async (senderId, receiverId) => {
  const conversationId = [senderId, receiverId].sort().join("*_*");
  const convRef = ref(db, `conversations/${conversationId}`);

  const snapshot = await get(ref(db, `conversations/${conversationId}`));
  if (!snapshot.exists()) {
    await set(convRef, {
      participants: { [senderId]: true, [receiverId]: true },
      createdAt: Date.now(),
    });
  }
};
export const APIsendMessage = async (senderId, receiverId, text) => {
  const conversationId = [senderId, receiverId].sort().join("*_*");
  const messagesRef = ref(db, `conversations/${conversationId}/messages`);
  const newMsgRef = push(messagesRef);
  const newMsgKey = newMsgRef.key;
  const timestamp = Date.now();
  const newMsg = {
    senderId,
    text,
    timestamp,
  };
  await update(ref(db), {
    [`conversations/${conversationId}/messages/${newMsgKey}`]: newMsg,
    [`conversations/${conversationId}/lastMessage`]: newMsg,
  });
};

export const APIgetConversation = async (senderId, receiverId) => {
  const conversationId = [senderId, receiverId].sort().join("*_*");
  const snapshot = await get(ref(db, `conversations/${conversationId}`));
  if (snapshot.exists()) {
    const msgObj = snapshot.val().messages;
    const messagesArray = Object.entries(msgObj).map(([id, value]) => ({
      id,
      ...value,
    }));

    return {
      id: conversationId,
      ...snapshot.val(),
      messages: messagesArray,
    };
  } else {
    return null; // hoặc trả về {} tùy ý
  }
};
export const APIgetAllConversationsOfUser = async (userId) => {
  const conversationsRef = ref(db, "conversations");
  const snapshot = await get(conversationsRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  const conversations = Object.entries(data)
    .filter(([_, conv]) => conv.participants?.[userId])
    .map(([id, conv]) => ({
      id,
      ...conv,
    }))
    .sort(
      (a, b) =>
        (b.lastMessage?.timestamp || 0) - (a.lastMessage?.timestamp || 0)
    );

  return conversations;
};
export const APISeenChat = async (conversationId) => {
  const lastMessageRef = ref(db, `conversations/${conversationId}/lastMessage`);

  const snapshot = await get(lastMessageRef);
  if (snapshot.exists()) {
    const lastMessage = snapshot.val();
    if (lastMessage) {
      const updatedLastMessage = {
        ...lastMessage,
        seen: true,
      };
      await update(lastMessageRef, updatedLastMessage);
    }
  }
};
