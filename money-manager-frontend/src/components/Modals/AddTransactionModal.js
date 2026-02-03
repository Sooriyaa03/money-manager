import { useState } from "react";
import { addTransaction } from "../../services/api";

const categories = ["food", "fuel", "movie", "medical", "loan"];
const accounts = ["cash", "bank", "wallet"];

export default function AddTransactionModal({ onClose }) {
  const [type, setType] = useState("income");
  const [form, setForm] = useState({
    amount: "",
    category: "food",
    division: "personal",
    account: "cash",
    fromAccount: "bank",
    toAccount: "cash",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (type === "transfer") {
      await fetch("http://localhost:5000/api/transactions/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromAccount: form.fromAccount,
          toAccount: form.toAccount,
          amount: form.amount,
          description: form.description
        })
      });
    } else {
      await addTransaction({ ...form, type });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl border border-gray-200 shadow-lg p-6">
        {/* HEADER */}
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Add Transaction
          </h3>
          <p className="text-sm text-gray-500">
            Income, expense, or account transfer
          </p>
        </div>

        {/* TABS */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
          {["income", "expense", "transfer"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                type === t
                  ? "bg-white text-indigo-600 shadow"
                  : "text-gray-500"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* TRANSFER FORM */}
          {type === "transfer" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Account
                </label>
                <select
                  name="fromAccount"
                  value={form.fromAccount}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  {accounts.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Account
                </label>
                <select
                  name="toAccount"
                  value={form.toAccount}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  {accounts.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </>
          ) : (
            <>
              {/* AMOUNT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* DIVISION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Division
                </label>
                <select
                  name="division"
                  value={form.division}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="personal">Personal</option>
                  <option value="office">Office</option>
                </select>
              </div>

              {/* ACCOUNT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account
                </label>
                <select
                  name="account"
                  value={form.account}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  {accounts.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
