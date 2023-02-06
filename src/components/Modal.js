import React from "react";

function Modal({ shouldShow, onClose, children }) {
  return shouldShow ? (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="bg-white my-[10%] mx-auto max-w-xl  relative  border shadow-lg rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
}

export default Modal;
