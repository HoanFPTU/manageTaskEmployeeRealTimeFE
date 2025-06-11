export const ChatBubble = ({ message, isMe }) => {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`
            max-w-[60%] px-4 py-2 rounded-lg 
            ${
              isMe
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-200 text-black rounded-bl-none"
            }
          `}
      >
        {message}
      </div>
    </div>
  );
};
