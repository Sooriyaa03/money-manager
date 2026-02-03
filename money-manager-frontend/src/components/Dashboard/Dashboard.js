import { useEffect, useState, useCallback } from "react";
import { getAnalytics } from "../../services/api";
import IncomeExpenseChart from "../Charts/IncomeExpenseChart";

export default function Dashboard() {
  const [range, setRange] = useState("monthly");
  const [chartData, setChartData] = useState([]);

  const loadData = useCallback(async () => {
    const res = await getAnalytics(range);
    setChartData([
      { name: "Income", amount: res.income },
      { name: "Expense", amount: res.expense }
    ]);
  }, [range]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-200">
        <div>
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Overview
          </h2>
          <p className="text-lg font-semibold text-gray-900">
            Income vs Expense
          </p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="
            border border-gray-300 bg-white
            text-sm text-gray-700
            px-3 py-1.5 rounded-md
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* CHART */}
      <div className="px-5 py-4">
        <IncomeExpenseChart data={chartData} />
      </div>
    </div>
  );
}
