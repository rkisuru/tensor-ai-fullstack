import React from "react";

const Question = ({ question }) => {
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

        <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
          <span className="text-sm font-medium text-white leading-none">
            AZ
          </span>
        </span>
      </li>
    </div>
  );
};

export default Question;
