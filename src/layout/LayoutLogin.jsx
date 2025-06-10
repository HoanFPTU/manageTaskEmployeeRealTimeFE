import React from "react";
import { Button } from "antd";
export default function LayoutLogin({ children }) {
  return (
    <>
      <div className="min-h-screen flex justify-center py-9 px-12 overflow-hidden">
        <div className="flex justify-center items-center max-w-[1170px] w-full">
          <div className="w-1/3 flex flex-col gap-4">
            <div className="flex justify-center items-center">
              <img
                src="./logo.png"
                className="mb-9 cursor-pointer w-56"
                alt="Logo"
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
