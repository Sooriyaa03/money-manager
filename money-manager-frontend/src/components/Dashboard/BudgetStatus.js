import { useEffect, useState } from "react";
import { getBudgetStatus, setBudget } from "../../services/api";

const categories = ["food", "fuel", "movie", "medical", "loan"];

export default function BudgetStatus() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("food");
  const [limit, setLimit] = useState("");

  const loadData = async () => {
    const res = await getBudgetStatus();
    setData(res);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSet = async () => {
    if (!limit) return;
    await setBudget({ category, limit });
    setLimit("");
    loadData();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
      {/* HEADER */}
      <div className="px-5 pt-5 pb-3 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Planning
        </h2>
        <p className="text-lg font-semibold text-gray-900">
          Monthly Budget
        </p>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-4">
        {/* SET BUDGET */}
        <div className="flex gap-2 mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              flex-1 rounded-md border border-gray-300
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="
              flex-1 rounded-md border border-gray-300
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />

          <button
            onClick={handleSet}
            className="
              px-4 py-2 text-sm font-medium
              text-white bg-indigo-600 rounded-md
              hover:bg-indigo-700 transition
            "
          >
            Set
          </button>
        </div>

        {/* BUDGET STATUS */}
        <ul className="space-y-3">
          {data.map((b) => (
            <li
              key={b.category}
              className={`
                flex items-center justify-between
                p-3 rounded-md text-sm
                ${
                  b.exceeded
                    ? "bg-red-50 border border-red-200"
                    : "bg-green-50 border border-green-200"
                }
              `}
            >
              <span className="capitalize text-gray-700">
                {b.category}
              </span>

              <span className="font-medium text-gray-900">
                ₹{b.spent} / ₹{b.limit}
                <span className="text-gray-500 ml-1">
                  ({b.percentage}%)
                </span>
                {b.exceeded && (
                  <span className="ml-1 text-red-500">⚠️</span>
                )}
              </span>
            </li>
          ))}

          {data.length === 0 && (
            <li className="text-sm text-gray-500 text-center py-4">
              No budgets set yet
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
