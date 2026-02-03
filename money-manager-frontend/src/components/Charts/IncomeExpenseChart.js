import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function IncomeExpenseChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        barSize={42}
        margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
      >
        {/* Subtle grid lines */}
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#E5E7EB"
        />

        {/* X Axis */}
        <XAxis
          dataKey="name"
          tick={{ fill: "#6B7280", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        {/* Y Axis */}
        <YAxis
          tick={{ fill: "#6B7280", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />

        {/* Tooltip */}
        <Tooltip
          cursor={{ fill: "rgba(79,70,229,0.08)" }}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            fontSize: "12px"
          }}
          formatter={(value) => [`₹${value}`, "Amount"]}
        />

        {/* Bars */}
        <Bar
          dataKey="amount"
          fill="#4F46E5"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
