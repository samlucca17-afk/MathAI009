
import React from 'react';
import type { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAI = message.sender === 'ai';

  const bubbleClasses = isAI
    ? 'bg-white text-slate-700 self-start rounded-bl-none'
    : 'bg-blue-500 text-white self-end rounded-br-none';

  const containerClasses = isAI ? 'justify-start' : 'justify-end';

  return (
    <div className={`flex w-full my-2 ${containerClasses}`}>
      <div className={`max-w-xl lg:max-w-2xl p-4 rounded-xl shadow-md ${bubbleClasses}`}>
        <p className="whitespace-pre-wrap text-base">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
