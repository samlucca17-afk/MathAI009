
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface InputFormProps {
  userInput: string;
  onUserInput: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);


const InputForm: React.FC<InputFormProps> = ({ userInput, onUserInput, onSubmit, isLoading }) => {
  return (
    <footer className="sticky bottom-0 bg-slate-100 p-4 w-full border-t border-slate-200">
      <form onSubmit={onSubmit} className="max-w-3xl mx-auto flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => onUserInput(e.target.value)}
          placeholder={isLoading ? "Calculando..." : "Qual cálculo você quer resolver?"}
          className="flex-grow p-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed shadow-sm transition-transform transform active:scale-95 flex items-center justify-center"
        >
          {isLoading ? <LoadingSpinner /> : <SendIcon/>}
        </button>
      </form>
    </footer>
  );
};

export default InputForm;
