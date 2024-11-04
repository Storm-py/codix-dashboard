"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import React from "react";

const PathChecker = ({ children }) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/");

  return (
    <>
      {isDashboard ? (
        <>
          <div className="w-full h-screen flex justify-between items-start">
            <div className="w-full h-full">
            {children}
            </div>
        </div>
        </>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  );
};

export default PathChecker;
