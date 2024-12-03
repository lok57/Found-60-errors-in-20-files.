interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

import { useEffect } from 'react';

export default function Toast({
  show,
  message,
  onClose,
  duration,
}: ToastProps) {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer); // Cleanup the timer on unmount or when show/duration changes
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-300"
        >
          ×
        </button>
      </div>
    </div>
  );
}
