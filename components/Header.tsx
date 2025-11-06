
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md w-full p-4 text-center sticky top-0 z-10">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
        MathAI Tutor 🧠
      </h1>
      <p className="text-sm md:text-base text-slate-500">Seu professor de matemática particular, divertido e paciente!</p>
    </header>
  );
};

export default Header;
