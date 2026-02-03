import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = [
  "#4F46E5", // indigo
  "#6366F1",
  "#818CF8",
  "#A5B4FC",
  "#C7D2FE"
];

export default function CategoryPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={4}
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(value) => [`₹${value}`, "Amount"]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            fontSize: "12px"
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
