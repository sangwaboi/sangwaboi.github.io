"use client";
import { useState } from "react";
import { submitMessage } from "../actions";

function page() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    await submitMessage(name, message);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16 text-white">
      <div className="w-4/5 lg:w-1/2">
        <div className="flex flex-col">
          <p>leave me a message below if you want</p>
        </div>
        <form className="flex flex-col gap-4 mt-24 items-end">
          <div className="flex items-end w-full">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={75}
              placeholder="name (optional)"
              className="bg-transparent border-b border-white outline-none w-full"
            />
            <p className="text-xs border-b leading-none text-blue-300">
              {name.length}/75
            </p>
          </div>
          <div className="flex items-end w-full">
            <textarea
              maxLength={420}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
              className="w-full bg-[#0f0f0f] outline-none h-48 border-b resize-none"
            />
            <p className="text-xs border-b leading-none text-blue-300">
              {message.length}/420
            </p>
          </div>
          <p
            onClick={handleSubmit}
            className="hover:text-blue-300 hover:underline underline-offset-4 cursor-pointer"
          >
            [submit]
          </p>
        </form>
      </div>
    </div>
  );
}

export default page;
