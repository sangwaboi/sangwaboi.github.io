"use client";
import React, { useEffect, useState, useRef } from "react";

const INITIAL_FILES = [
  {
    name: "thoughts",
    content: "run 'cd thoughts' or type 'thoughts' to see my thoughts on various topics",
  },
  {
    name: "blogs",
    content: "run 'cd blogs' or type 'blogs' to see my blogs",
  },
  {
    name: "socials.txt",
    content:
      "twitter: sangwaboii\ngithub: sangwaboi\nlinkedin: sangwa-vishvendra",
  },
  {
    name: "resume.txt",
    content: "My resume - run 'cd resume.txt' to download",
  },
  {
    name: "gui.app",
    content: "run './gui.app' to open the GUI version of this website (if available)",
  },
];

const COMMAND_LIST = [
  "whoami",
  "ls",
  "help",
  "cd",
  "cat",
  "clear",
  "rm",
  "touch",
  "reset",
  "socials",
  "./gui.app"
];

interface Message {
  message: string | React.ReactNode;
  type: "input" | "output";
}

interface File {
  name: string;
  content: string | React.ReactNode;
}

const USER_INFO = {
  name: "sangwaboi",
  // bio: "Student of Computer Science and AI/ML at the School of Tech Polaris. Interested in web3, Robotics, and AI agentic flows. Believer in authentic, compounding relationships. Currently building some BaaS.",
  // location: "Bengaluru, KA",
  socialsText: "twitter: https://x.com/sangwaboii\ngithub: https://github.com/sangwaboi\nlinkedin: https://www.linkedin.com/in/sangwa-vishvendra/",
};

interface CLIProps {
  hidePrefilledBio?: boolean;
}

function CLI({ hidePrefilledBio = false }: CLIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>(INITIAL_FILES);
  const [currentDir, setCurrentDir] = useState("~");
  const [hasInteracted, setHasInteracted] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = (command: string) => {
    const newMessages: Message[] = [];
    const parts = command.trim().toLowerCase().split(" ");
    const baseCmd = parts[0];
    const arg = parts[1];

    switch (baseCmd) {
      case "reset":
        setFiles(INITIAL_FILES);
        setCurrentDir("~");
        newMessages.push({
          message: "System reset to initial state.",
          type: "output",
        });
        break;
      case "whoami":
        newMessages.push({ message: USER_INFO.name, type: "output" });
        // newMessages.push({ message: USER_INFO.bio, type: "output" });
        // newMessages.push({ message: USER_INFO.location, type: "output" });
        break;
      case "ls":
        if (currentDir === "~" || currentDir === "/") {
          newMessages.push({
            message: files.map((file) => file.name).join("\n"),
            type: "output",
          });
        } else if (currentDir === "thoughts") {
          newMessages.push({ message: "thought1.md\nthought2.md", type: "output" }); // Placeholder
        } else if (currentDir === "blogs") {
          newMessages.push({ message: "blog_post_1.md\ntech_musings.md", type: "output" }); // Placeholder
        }
        break;
      case "help":
        newMessages.push({
          message: COMMAND_LIST.filter(Boolean).join("\n"),
          type: "output",
        });
        break;
      case "clear":
        setMessages([]);
        return;
      case "socials":
        newMessages.push({ message: USER_INFO.socialsText, type: "output" });
        break;
      case "thoughts":
      case "blogs":
        window.location.href = `/${baseCmd}`;
        newMessages.push({
          message: `Redirecting to ${baseCmd}...`,
          type: "output",
        });
        break;
      case "cd":
        if (!arg || arg === "~" || arg === "/") {
          setCurrentDir("~");
        } else if (files.some(f => f.name === arg && (arg === "thoughts" || arg === "blogs"))) {
          setCurrentDir(arg);
        } else if (arg === "resume.txt") {
          newMessages.push({
            message: "Downloading resume...",
            type: "output",
          });
          
          // Create an anchor element to download the resume
          const downloadLink = document.createElement('a');
          downloadLink.href = '/Resume.pdf';  // Path to your resume in the public folder
          downloadLink.download = 'Vishvendra_Sangwa_Resume.pdf';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
        } else {
          newMessages.push({
            message: `cd: ${arg}: No such directory or not a directory`,
            type: "output",
          });
        }
        break;
      case "cat":
        if (!arg) {
          newMessages.push({
            message: "usage: cat <filename>",
            type: "output",
          });
          break;
        }
        let fileToCat = null;
        if (currentDir === "~" || currentDir === "/") {
          fileToCat = files.find((file) => file.name === arg);
        } else if (currentDir === "thoughts") {
          // Placeholder for reading thought files
          if (arg === "thought1.md") fileToCat = { name: arg, content: "This is my first thought..." }; 
        } else if (currentDir === "blogs") {
          // Placeholder for reading blog files
          if (arg === "blog_post_1.md") fileToCat = { name: arg, content: "My first blog post content..." }; 
        }

        if (fileToCat) {
          newMessages.push({ message: fileToCat.content, type: "output" });
        } else {
          newMessages.push({
            message: `cat: ${arg}: No such file or directory`,
            type: "output",
          });
        }
        break;
      case "./gui.app":
        newMessages.push({
          message: "Opening GUI...",
          type: "output",
        });
        setTimeout(() => {
          window.location.href = "/gui";
        }, 300);
        break;
      case "exit":
        newMessages.push({ message: "Exiting terminal... Goodbye!", type: "output" });
        // In a real terminal, this would close the window or tab.
        // Here, we can just clear the input and messages after a delay.
        setTimeout(() => {
          setMessages([]);
          setInput("");
        }, 1000);
        break;
      default:
        if (command.trim() !== "") {
          newMessages.push({
            message: `${baseCmd}: command not found`,
            type: "output",
          });
        }
    }
    setMessages((prev) => [...prev, ...newMessages]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { message: `$ ${input}`, type: "input" }]);
    executeCommand(input);
    setInput("");
    setHasInteracted(true);
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      className="bg-transparent text-white font-mono w-full overflow-y-auto text-xl"
      onClick={() => inputRef.current?.focus()}
    >
      {messages.map((msg, index) => (
        <div key={index} className={`whitespace-pre-wrap ${msg.type === "input" ? "text-white" : "text-orange-400"}`}>
          {typeof msg.message === 'string' 
            ? msg.message
            : msg.message}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-white mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-grow text-white text-xl"
          placeholder={hasInteracted ? "" : "type 'help' for a list of commands"}
          autoFocus
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}

export default CLI;
