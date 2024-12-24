import React, { useEffect, useState } from "react";
import { fetchUserImage } from "../services/Api";

const Question = ({ question }) => {
  const [response, setResponse] = useState(null);

  const userImage = async () => {
    try {
      const apiResponse = await fetchUserImage();
      setResponse(apiResponse);
      console.log(apiResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userImage();
  });

  if (!question) {
    return null;
  }
  return (
    <div>
      <li className="ms-auto max-w-4xl mx-auto flex justify-end gap-x-2 sm:gap-x-4">
        <div className="grow text-end space-y-3">
          <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-white">{question}</p>
          </div>
        </div>

        <span className="shrink-0 inline-flex items-center justify-center size-[38px]">
          <img className="rounded-full" src={response} alt="user-image" />
        </span>
      </li>
    </div>
  );
};

export default Question;
