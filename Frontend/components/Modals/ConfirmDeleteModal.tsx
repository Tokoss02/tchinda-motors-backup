'use client';

interface DeleteConfirmationModalProps {
  itemName: string | undefined;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  itemName,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">
          Delete <span className="text-red-600 font-bold">{itemName}</span>?
        </h2>
        <p className="mb-6 text-gray-600">This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
