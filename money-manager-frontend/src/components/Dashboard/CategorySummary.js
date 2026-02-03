import { useEffect, useState } from "react";
import { getCategorySummary } from "../../services/api";
import CategoryPieChart from "../Charts/CategoryPieChart";

export default function CategorySummary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getCategorySummary();
    setData(
      res.map((item) => ({
        name: item._id,
        value: item.total
      }))
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
      {/* HEADER */}
      <div className="px-5 pt-5 pb-3 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Insights
        </h2>
        <p className="text-lg font-semibold text-gray-900">
          Expense by Category
        </p>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-4 grid grid-cols-1 gap-6">
        {/* Donut Chart */}
        <CategoryPieChart data={data} />

        {/* Category List */}
        <ul className="space-y-3">
          {data.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
                <span className="capitalize text-gray-700">
                  {c.name}
                </span>
              </div>

              <span className="font-medium text-gray-900">
                ₹{c.value}
              </span>
            </li>
          ))}

          {data.length === 0 && (
            <li className="text-sm text-gray-500 text-center py-4">
              No expense data available
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
