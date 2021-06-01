import React from "react";
import Form from "./Form";

const App = () => {
  return (
    <div className="flex flex-col items-center py-10 ">
      <h1 className="text-6xl font-title font-bold w-11/12 text-center">
        Cookie banner generator
      </h1>
      <Form />
    </div>
  );
};

export default App;
