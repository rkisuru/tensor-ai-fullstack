import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserImage } from "../services/Api";
import Menu from "./Menu";
import RingLoader from "react-spinners/RingLoader";

const Conversation = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  const userImage = async () => {
    try {
      const apiResponse = await fetchUserImage();
      setResponse(apiResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#2563EB",
  };

  const parseResponse = (text) => {
    const lines = text.split("\n");

    return lines.map((line, index) => {
      if (line.trim().startsWith("* **")) {
        const boldText = line.match(/\*\*(.*?)\*\*/)?.[1] || "";
        const restOfText = line.replace(`* **${boldText}**`, "").trim();
        return (
          <li key={index} className="list-disc ml-6">
            <strong>{boldText}</strong> {restOfText}
          </li>
        );
      } else if (line.includes("**")) {
        const parts = line.split(/(\*\*.*?\*\*)/);
        return (
          <p key={index}>
            {parts.map((part, i) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={i}>{part.slice(2, -2)}</strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }

      return (
        <p key={index} className="text-sm text-gray-800 dark:text-neutral-200">
          {line} <br />
        </p>
      );
    });
  };

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/tensor/chats/${id}`,
          {
            withCredentials: true,
          }
        );
        const chatData = await response.data;
        setChat(chatData);
      } catch (error) {
        console.error("Error fetching chat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
    userImage();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={override}
          color="#2563EB"
        />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="sm:ms-5">
        <Menu />
      </div>
      <div className="max-w-4xl mx-auto flex flex-col justify-center my-10">
        <div>
          <li className="ms-auto mx-auto flex justify-end gap-x-2 sm:gap-x-4">
            <div className="grow text-end space-y-3">
              <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-sm">
                <p className="text-sm text-white">{chat.question}</p>
              </div>
            </div>

            <span className="shrink-0 inline-flex items-center justify-center size-[38px]">
              <img className="rounded-full" src={response} alt="user" />
            </span>
          </li>
        </div>

        <div>
          <div className="mt-16 space-y-5 max-w-4xl mx-auto">
            <div className="flex gap-x-2 sm:gap-x-4">
              <svg
                className="shrink-0 size-[38px] rounded-full"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="38" height="38" rx="6" fill="#2563EB" />
                <path
                  d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
              </svg>

              <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                  {parseResponse(chat.answer)}
                </div>

                <div className="sm:flex sm:justify-between">
                  <div>
                    <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                      <button
                        type="button"
                        className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
                      >
                        <svg
                          className="shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 10v12" />
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
                      >
                        <svg
                          className="shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 14V2" />
                          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                        </svg>
                      </button>
                    </div>
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 14V2" />
                        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                      </svg>
                      Copy
                    </button>
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                      </svg>
                      Share
                    </button>
                  </div>

                  <div className="mt-1 sm:mt-0">
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                      </svg>
                      New answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
