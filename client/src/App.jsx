import React, { useState } from "react";
import Home from "./pages/Home";
import ChatInput from "./components/ChatInput";
import ChatResponse from "./components/ChatResponse";
import { fetchResponse } from "./services/Api";
import Question from "./components/Question";

const App = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
