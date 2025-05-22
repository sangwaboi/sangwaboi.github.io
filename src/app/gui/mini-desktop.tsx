"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const files = {
  "vishvendra.txt":
    "hi!\n\nmy name is vishvendra, i'm studying computer science and Ai/ML at the school of tech polaris.\n\ni like web3 dev, tons of Robotics, and Ai agentic flows.\n\ni'm a big believer in authentic, compounding relationships. feel free to reach out to me!\n\ncurrently building some BaaS",
  "socials.txt":
    "twitter: https://x.com/sangwaboii\ngithub: https://github.com/sangwaboi\nlinkedin: https://www.linkedin.com/in/sangwa-vishvendra/",
  "thoughts.txt": "A collection of my thoughts - WIP",
  "blogs.txt": "My blog posts - WIP",
  "resume.txt": "My resume - Download this file to view",
};

export default function MiniDesktop() {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [showCLI, setShowCLI] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setShowCLI(true);
      }
    }
  }, []);

  const handleFileAction = (file: string) => {
    if (file === "resume.txt") {
      // Download the resume
      const downloadLink = document.createElement('a');
      downloadLink.href = '/Resume.pdf'; 
      downloadLink.download = 'Vishvendra_Sangwa_Resume.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      setActiveFile(file);
    }
  };

  if (showCLI) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4">
        <p className="text-2xl mb-4">Terminal is a better experience on this device.</p>
        <Link href="/" className="text-blue-400 hover:text-orange-400 text-xl">
          Go to Terminal
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white font-mono text-xl">
      <div className="w-full md:w-1/4 bg-gray-900 p-4 border-r border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Files</h2>
        <ul>
          {Object.keys(files).map((file) => (
            <li
              key={file}
              className={`p-2 rounded cursor-pointer hover:bg-gray-800 hover:text-orange-400 ${
                activeFile === file ? "bg-gray-800 text-orange-400" : ""
              }`}
              onClick={() => handleFileAction(file)}
            >
              {file}
            </li>
          ))}
        </ul>
        <Link href="/" className="mt-4 pt-4 text-center text-gray-400 hover:text-orange-400 block text-xl">
          Exit GUI (Go to Terminal)
        </Link>
      </div>
      <div className="w-full md:w-3/4 bg-black p-6">
        {activeFile ? (
          <div>
            <h3 className="text-3xl font-semibold mb-3 border-b border-gray-800 pb-2">{activeFile}</h3>
            <pre className="whitespace-pre-wrap text-gray-300 text-xl">
              {files[activeFile as keyof typeof files]}
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-xl">Select a file to view its content.</p>
          </div>
        )}
      </div>
    </div>
  );
}
