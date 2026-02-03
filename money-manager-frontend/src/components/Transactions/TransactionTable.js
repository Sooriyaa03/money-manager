import { useEffect, useState, useCallback } from "react";
import { getTransactions } from "../../services/api";
import EditTransactionModal from "../Modals/EditTransactionModal";

const categories = ["food", "fuel", "movie", "medical", "loan"];
const divisions = ["personal", "office"];

export default function TransactionTable() {
  const [data, setData] = useState([]);
  const [editTx, setEditTx] = useState(null);

  const [filters, setFilters] = useState({
    category: "",
    division: "",
    startDate: "",
    endDate: ""
  });

  // ✅ FIX: make loadData stable
  const loadData = useCallback(async () => {
    const res = await getTransactions(filters);
    setData(res);
  }, [filters]);

  // ✅ FIX: correct dependency
  useEffect(() => {
    loadData();
  }, [loadData]);

  const canEdit = (createdAt) => {
    const hours12 = 12 * 60 * 60 * 1000;
    return Date.now() - new Date(createdAt).getTime() < hours12;
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => loadData();

  const clearFilters = () => {
    const cleared = {
      category: "",
      division: "",
      startDate: "",
      endDate: ""
    };
    setFilters(cleared);
    getTransactions(cleared).then(setData);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 p-5 shadow-sm">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          History
        </h2>
        <p className="text-lg font-semibold text-gray-900">
          Transactions
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-5">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          name="division"
          value={filters.division}
          onChange={handleFilterChange}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All Divisions</option>
          {divisions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        <div className="flex gap-2">
          <button
            onClick={applyFilters}
            className="flex-1 bg-indigo-600 text-white rounded-md px-3 py-2 text-sm hover:bg-indigo-700"
          >
            Apply
          </button>
          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-100 rounded-md px-3 py-2 text-sm hover:bg-gray-200"
          >
            Clear
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="text-xs text-gray-500 uppercase tracking-wide border-b">
            <tr>
              <th className="py-3 px-3 text-left w-[14%]">Date</th>
              <th className="py-3 px-3 text-left w-[14%]">Type</th>
              <th className="py-3 px-3 text-left w-[16%]">Category</th>
              <th className="py-3 px-3 text-left w-[22%]">Account</th>
              <th className="py-3 px-3 text-right w-[18%]">Amount</th>
              <th className="py-3 px-3 text-right w-[16%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((tx) => (
              <tr
                key={tx._id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3 px-3 text-left">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-3 text-left capitalize">
                  {tx.type === "transfer" ? "Transfer" : tx.type}
                </td>

                <td className="py-3 px-3 text-left">
                  {tx.category || "-"}
                </td>

                <td className="py-3 px-3 text-left">
                  {tx.type === "transfer"
                    ? `${tx.fromAccount} → ${tx.toAccount}`
                    : tx.account}
                </td>

                <td className="py-3 px-3 text-right font-medium">
                  ₹{tx.amount}
                </td>

                <td className="py-3 px-3 text-right">
                  {tx.type !== "transfer" && (
                    <button
                      disabled={!canEdit(tx.createdAt)}
                      onClick={() => setEditTx(tx)}
                      className={`px-3 py-1.5 text-xs rounded-md ${
                        canEdit(tx.createdAt)
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editTx && (
        <EditTransactionModal
          tx={editTx}
          onClose={() => setEditTx(null)}
          onUpdated={loadData}
        />
      )}
    </div>
  );
}
