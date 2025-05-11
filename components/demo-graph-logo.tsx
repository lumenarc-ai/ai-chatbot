"use client";

import React from "react";

interface DemoGraphLogoProps {
  size?: number;
  className?: string;
}

export function DemoGraphLogo({
  size = 40,
  className = "",
}: DemoGraphLogoProps) {
  // Colors from the screenshot
  const bgColor = "#0066b3"; // Deep blue background
  const lightBlue = "#a8c7e5"; // Light blue squares
  const white = "#ffffff"; // White squares

  return (
    <div
      className={`flex items-center justify-center rounded-full overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
      }}
    >
      <div className="relative" style={{ width: "61%", height: "46%" }}>
        {/* Top row */}
        <div
          className="absolute"
          style={{
            top: "0%",
            left: "33.3%",
            width: "33.3%",
            height: "33.3%",
            backgroundColor: white,
          }}
        ></div>

        {/* Middle row */}
        <div
          className="absolute"
          style={{
            top: "33.3%",
            left: "0%",
            width: "33.3%",
            height: "33.3%",
            backgroundColor: lightBlue,
          }}
        ></div>
        <div
          className="absolute"
          style={{
            top: "33.3%",
            left: "33.3%",
            width: "33.3%",
            height: "33.3%",
            backgroundColor: white,
          }}
        ></div>
        <div
          className="absolute"
          style={{
            top: "33.3%",
            left: "66.6%",
            width: "33.3%",
            height: "33.3%",
            backgroundColor: lightBlue,
          }}
        ></div>

        {/* Bottom row */}
        <div
          className="absolute"
          style={{
            top: "66.6%",
            left: "0%",
            width: "33.3%",
            height: "33.3%",
            backgroundColor: white,
          }}
        ></div>
        <div
          className="absolute"
          style={{
            top: "66.6%",
            left: "33.3%",
            width: "33.3%",
            height: "33.3%",
            backgroundColor: bgColor,
          }}
        ></div>
        <div
          className="absolute"
          style={{
            top: "66.6%",
            left: "66.6%",
            width: "33.3%",
            height: "33.3%",
            backgroundColor: white,
          }}
        ></div>
      </div>
    </div>
  );
}
