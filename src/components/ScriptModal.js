import React from "react";
import Button from "./Button";

const ScriptModal = ({ children, onClick }) => {
  return (
    <div className="fixed w-full h-full flex justify-center items-center bg-opacity-70 bg-black">
      <div className="bg-white p-8 rounded-xl sm:w-4/5">
        <div className="bg-black text-white p-8 rounded-xl break-all">
          <code className="text-xs sm:text-base">{children}</code>
        </div>
        <div className="text-right">
          <Button onClick={onClick}>Copy & Preview</Button>
        </div>
      </div>
    </div>
  );
};

export default ScriptModal;
