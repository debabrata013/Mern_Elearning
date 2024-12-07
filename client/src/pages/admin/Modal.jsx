import React from 'react';
import { X } from "lucide-react";

const Modal = ({ isOpen, close, title, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={close}><X className="w-6 h-6" /></button>
        </div>
        <form onSubmit={onSubmit} className="mt-4">
          {children}
        </form>
      </div>
    </div>
  );
};

export default Modal;
