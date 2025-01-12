import React, { useState } from "react";
import ChatInput from "../components/ChatInput";
import ChatResponse from "../components/ChatResponse";
import { fetchResponse } from "../services/Api";
import Question from "../components/Question";
import Menu from "../components/Menu";
import logo from "../assets/tensor-logo.png";
import RingLoader from "react-spinners/RingLoader";

const Home = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(null);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    setQuestion(question);
    try {
      setLoading(true);
      const apiResponse = await fetchResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const override = {
    display: "block",
    margin: "70px auto",
    borderColor: "#2563EB",
  };

  return (
    <div className="flex">
      <div className="sm:ms-5">
        <Menu />
      </div>
      <div className="flex flex-col justify-between h-screen lg:w-[700px] xl:w-[1000px] mx-auto">
        <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div class="text-center">
            <a
              class="inline-block mb-4 flex-none focus:outline-none focus:opacity-80"
              href="#"
              aria-label="Tensor-AI"
            >
              <img class="w-16 rounded-full" src={logo} alt="" />
            </a>

            <h1 class="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
              Welcome to <span className="text-blue-800">Tensor-AI</span>
            </h1>
            <p class="mt-3 text-gray-600 dark:text-neutral-400">
              Your AI-powered chatbot
            </p>
          </div>
        </div>
        <div>
          <Question question={question} />
          {loading && (
            <RingLoader
              loading={loading}
              aria-label="Loading Spinner"
              data-testid="loader"
              cssOverride={override}
              color="#2563EB"
            />
          )}
          <ChatResponse response={response} />
        </div>
        <div className="sticky bottom-0 z-10">
          <ChatInput onSubmit={handleQuestionSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Home;
