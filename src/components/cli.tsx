"use client";
import React, { useEffect, useState } from "react";

const commands = ["whoami", "ls", "help", "cat", "clear"];

interface Message {
  message: string;
  type: "input" | "output";
}

interface File {
  name: string;
  content: string;
}

function CLI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([
    {
      name: "socials.txt",
      content:
        "twitter: ksw_arman\ngithub: armans-code\nlinkedin: armankumaraswamy",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { message: input, type: "input" }]);
    console.log(messages);
    if (commands.includes(input.split(" ")[0])) {
      switch (input) {
        case "whoami":
          setMessages((prev) => [
            ...prev,
            { message: "arman", type: "output" },
          ]);
          break;
        case "ls":
          setMessages((prev) => [
            ...prev,
            {
              message: files.map((file) => file.name).join("\n"),
              type: "output",
            },
          ]);
          break;
        case "help":
          setMessages((prev) => [
            ...prev,
            { message: commands.join("\n"), type: "output" },
          ]);
          break;
        case "clear":
          setMessages([]);
          break;
        default:
          if (input.startsWith("cat")) {
            const fileName = input.split(" ")[1];
            const file = files.find((file) => file.name === fileName);
            if (file) {
              setMessages((prev) => [
                ...prev,
                { message: file.content, type: "output" },
              ]);
            } else {
              setMessages((prev) => [
                ...prev,
                {
                  message: `cat: ${fileName}: No such file or directory`,
                  type: "output",
                },
              ]);
            }
          }
      }
    } else {
      setMessages((prev) => [
        ...prev,
        {
          message: `cli: command not found: ${input}`,
          type: "output",
        },
      ]);
    }
    setInput("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(messages);
      if (e.key === "ArrowUp") {
        setInput(
          messages
            .filter((message) => message.type === "input")
            .map((message) => message.message)
            .pop() || ""
        );
      }
    };

    document.getElementById("cli")?.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [messages]);

  return (
    <div className="w-full">
      {messages.map((message, i) => (
        <p
          key={i}
          className={
            message.type === "input"
              ? "text-indigo-300"
              : "text-green-300 whitespace-pre-wrap"
          }
        >
          <span className="text-indigo-300">
            {message.type === "input" ? "> " : ""}
          </span>
          {message.message}
        </p>
      ))}
      <form
        id="cli"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <div className="hidden sm:flex">
          <span className="mr-2">$</span>
          <input
            type="text"
            className="bg-transparent border-none outline-none flex-grow w-full"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default CLI;
