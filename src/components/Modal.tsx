import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Server {
  id: string;
  name: string;
  memberCount: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  server: Server | null;
}

function Modal({ isOpen, onClose, onConfirm, server }: ModalProps) {
  if (!isOpen || !server) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-center text-yellow-500 mb-4">
          <AlertTriangle className="w-12 h-12" />
        </div>
        <h3 className="text-xl font-bold text-white text-center mb-4">Confirm Leave Server</h3>
        <p className="text-white/70 text-center mb-6">
          Are you sure you want to leave <span className="font-semibold text-white">{server.name}</span>?
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Leave Server
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;