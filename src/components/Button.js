import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-600 text-white px-6 py-3 rounded-md transform hover:scale-110 transition duration-300 mt-14 self-center w-52 font-bold"
      onClick={(event) => onClick && onClick(event)}
    >
      {children}
    </button>
  );
};

export default Button;
