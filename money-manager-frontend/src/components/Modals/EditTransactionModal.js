import { useState } from "react";
import { updateTransaction } from "../../services/api";

export default function EditTransactionModal({ tx, onClose, onUpdated }) {
  const [amount, setAmount] = useState(tx.amount);
  const [description, setDescription] = useState(tx.description);

  const handleUpdate = async () => {
    await updateTransaction(tx._id, { amount, description });
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-xl border border-gray-200 shadow-lg p-6">
        {/* HEADER */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Transaction
          </h3>
          <p className="text-sm text-gray-500">
            You can modify this entry within 12 hours
          </p>
        </div>

        {/* AMOUNT */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="
              w-full rounded-md border border-gray-300
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full rounded-md border border-gray-300
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 text-sm font-medium
              text-gray-700 bg-gray-100 rounded-md
              hover:bg-gray-200 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="
              px-4 py-2 text-sm font-medium
              text-white bg-indigo-600 rounded-md
              hover:bg-indigo-700 transition
            "
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
