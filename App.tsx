
import React, { useState, useEffect, useRef } from 'react';
import type { Message } from './types';
import { solveMathProblem } from './services/geminiService';
import Header from './components/Header';
import ChatBubble from './components/ChatBubble';
import InputForm from './components/InputForm';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      sender: 'ai',
      text: 'Olá! Eu sou o MathAI, seu professor de matemática particular. 🤓\n\nQual cálculo você gostaria de resolver hoje?',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userInput.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await solveMathProblem(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Desculpe, ocorreu um erro. Por favor, tente novamente.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto flex flex-col space-y-4">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
             <div className="flex justify-start my-2">
                <div className="max-w-xl lg:max-w-2xl p-4 rounded-xl shadow-md bg-white text-slate-700 self-start rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>
      <InputForm 
        userInput={userInput}
        onUserInput={setUserInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
