import React from "react";

export default function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed top-0 bg-black/0  flex items-center justify-center z-50 w-full left-0">
      <div className="bg-white p-6 rounded shadow-md w-[300px] text-center">
        <p className="mb-4">{message}</p>
        <div className="flex justify-around">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
            Hủy
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
}
