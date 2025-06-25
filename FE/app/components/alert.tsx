import React from "react";

export default function AlertMessage({ message, onClose }: { message: string; onClose: () => void }) {
  return (
      <div className={"w-screen fixed top-0 bg-black/0 z-50 flex items-center justify-center left-0"}>
          <div className=" bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
              {message}
              <button onClick={onClose} className="ml-4 font-bold">
                  ✕
              </button>
          </div>
      </div>

  );
}
