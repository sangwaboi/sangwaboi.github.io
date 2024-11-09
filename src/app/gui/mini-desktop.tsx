"use client";
import React, { useState } from "react";
import { File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MiniDesktop = () => {
  // todo: clean up this code...
  const [selectedFile, setSelectedFile] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [windowPositions, setWindowPositions] = useState({});
  const [windowSizes, setWindowSizes] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [lastClickTime, setLastClickTime] = useState(0);
  const [activeWindow, setActiveWindow] = useState(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });

  const files = {
    "armank.dev": "under construction... 🚧",
    "projects.txt": "under construction... 🚧",
    "experience.txt": "under construction... 🚧",
  };

  const handleFileClick = (fileName: string, e: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const timeSinceLastClick = currentTime - lastClickTime;

    // @ts-ignore
    if (e.target.id === "desktop-container") {
      setSelectedFile(null);
      return;
    }

    if (timeSinceLastClick < 300) {
      if (!openWindows.find((w) => w.fileName === fileName)) {
        const newWindow = {
          fileName,
          minimized: false,
          id: `window-${Date.now()}`,
        };
        setOpenWindows((prev) => [...prev, newWindow]);
        setWindowPositions((prev) => ({
          ...prev,
          [newWindow.id]: {
            x: 50 + openWindows.length * 20,
            y: 50 + openWindows.length * 20,
          },
        }));
        setWindowSizes((prev) => ({
          ...prev,
          [newWindow.id]: { width: 300, height: 250 },
        }));
        setActiveWindow(newWindow.id);
      }
    } else {
      setSelectedFile(fileName);
    }

    setLastClickTime(currentTime);
  };

  const handleWindowMouseDown = (windowId, e) => {
    if (e.target.closest(".window-title-bar")) {
      setIsDragging(windowId);
      const windowRect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - windowRect.left,
        y: e.clientY - windowRect.top,
      });
      setActiveWindow(windowId);
      e.preventDefault();
    }
  };

  const handleResizeStart = (windowId, e) => {
    e.preventDefault();
    setIsResizing(windowId);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
    });
    setActiveWindow(windowId);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const container = document.getElementById("desktop-container");
      const containerRect = container.getBoundingClientRect();
      const windowElement = document.getElementById(isDragging);
      const windowRect = windowElement.getBoundingClientRect();

      let newX = e.clientX - containerRect.left - dragOffset.x;
      let newY = e.clientY - containerRect.top - dragOffset.y;

      newX = Math.max(
        0,
        Math.min(newX, containerRect.width - windowRect.width)
      );
      newY = Math.max(
        0,
        Math.min(newY, containerRect.height - 40 - windowRect.height)
      );

      setWindowPositions((prev) => ({
        ...prev,
        [isDragging]: { x: newX, y: newY },
      }));
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      setWindowSizes((prev) => ({
        ...prev,
        [isResizing]: {
          width: Math.max(200, prev[isResizing].width + deltaX),
          height: Math.max(150, prev[isResizing].height + deltaY),
        },
      }));

      setResizeStart({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const toggleMinimize = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId
          ? { ...window, minimized: !window.minimized }
          : window
      )
    );
  };

  const closeWindow = (windowId) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== windowId));
    setWindowPositions((prev) => {
      const newPositions = { ...prev };
      delete newPositions[windowId];
      return newPositions;
    });
    setWindowSizes((prev) => {
      const newSizes = { ...prev };
      delete newSizes[windowId];
      return newSizes;
    });
  };

  return (
    <div
      id="desktop-container"
      className="w-full h-screen relative overflow-hidden"
      style={{ backgroundColor: "#6fb5b7" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={(e) =>
        setSelectedFile((s) => (e.target.id === "desktop-container" ? null : s))
      }
    >
      {/* Desktop Icons */}
      <div className="grid grid-cols-3 gap-4 w-fit p-4">
        {Object.keys(files).map((fileName) => (
          <div
            key={fileName}
            className={`flex flex-col items-center cursor-pointer p-2 rounded
              ${selectedFile === fileName ? "bg-blue-100" : "hover:bg-gray-200"}
              ${selectedFile === fileName ? "text-blue-600" : "text-black"}
            `}
            onClick={(e) => handleFileClick(fileName, e)}
          >
            <Image
              alt="File Icon"
              width={64}
              height={64}
              src="https://win98icons.alexmeub.com/icons/png/file_lines-0.png"
              className={`w-8 h-8 ${
                selectedFile === fileName ? "text-blue-500" : "text-blue-400"
              }`}
            />
            <span
              className={`text-sm mt-1 px-1 rounded text-center
              ${selectedFile === fileName ? "bg-blue-500 text-white" : ""}`}
            >
              {fileName}
            </span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {openWindows.map(
        (window) =>
          !window.minimized && (
            <div
              key={window.id}
              id={window.id}
              className="absolute bg-gray-200 rounded-none shadow-lg"
              style={{
                left: `${windowPositions[window.id]?.x}px`,
                top: `${windowPositions[window.id]?.y}px`,
                width: `${windowSizes[window.id]?.width}px`,
                height: `${windowSizes[window.id]?.height}px`,
                cursor: isDragging === window.id ? "grabbing" : "auto",
                zIndex: activeWindow === window.id ? 10 : 1,
                border: "2px solid #c0c0c0",
                borderTop: "2px solid #dfdfdf",
                borderLeft: "2px solid #dfdfdf",
                boxShadow: "inset -2px -2px #0a0a0a, inset 2px 2px #fff",
              }}
              onMouseDown={(e) => handleWindowMouseDown(window.id, e)}
            >
              {/* Window Title Bar */}
              <div
                className="window-title-bar flex items-center justify-between h-6 cursor-grab active:cursor-grabbing"
                style={{
                  background: "#000080",
                  padding: "2px 3px",
                }}
              >
                <span className="text-sm font-normal text-white">
                  Notepad - {window.fileName}
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => toggleMinimize(window.id)}
                    className="w-4 h-4 bg-gray-200 flex items-center justify-center"
                    style={{
                      border: "1px solid #000",
                      borderRight: "1px solid #848484",
                      borderBottom: "1px solid #848484",
                    }}
                  >
                    <span className="text-xs mb-2">_</span>
                  </button>
                  <button
                    onClick={() => closeWindow(window.id)}
                    className="w-4 h-4 bg-gray-200 flex items-center justify-center"
                    style={{
                      border: "1px solid #000",
                      borderRight: "1px solid #848484",
                      borderBottom: "1px solid #848484",
                    }}
                  >
                    <span className="text-xs">×</span>
                  </button>
                </div>
              </div>

              {/* Menu Bar */}
              <div className="bg-gray-200 text-xs border-b border-gray-400 px-1 py-0.5">
                <span className="mr-4">File</span>
                <span className="mr-4">Edit</span>
                <span className="mr-4">Format</span>
                <span>Help</span>
              </div>

              {/* Window Content */}
              <div className="bg-white h-[calc(100%-44px)] p-1">
                <textarea
                  className="w-full h-full resize-none p-1 border-none focus:outline-none font-mono text-sm"
                  style={{
                    background: "white",
                  }}
                  value={files[window.fileName]}
                  readOnly
                />
              </div>

              {/* Resize Handle */}
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                onMouseDown={(e) => handleResizeStart(window.id, e)}
                style={{
                  background: "transparent",
                }}
              />
            </div>
          )
      )}

      {/* Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 flex items-center px-1 space-x-1"
        style={{
          background: "#c0c0c0",
          borderTop: "2px solid #dfdfdf",
        }}
      >
        <Link href="/" className="absolute right-0 mr-4 hover:underline">
          prefer a CLI?
        </Link>
        {openWindows.map((window) => (
          <button
            key={window.id}
            className="h-6 px-2 flex items-center"
            style={{
              background: activeWindow === window.id ? "#bdbdbd" : "#c0c0c0",
              border: "2px solid #808080",
              borderTop: "2px solid #fff",
              borderLeft: "2px solid #fff",
            }}
            onClick={() => {
              if (window.minimized) {
                toggleMinimize(window.id);
              }
              setActiveWindow(window.id);
            }}
          >
            <File className="w-4 h-4 mr-2" />
            <span className="text-sm truncate max-w-[120px]">
              {window.fileName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniDesktop;
