import { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import TransactionTable from "../components/Transactions/TransactionTable";
import CategorySummary from "../components/Dashboard/CategorySummary";
import BudgetStatus from "../components/Dashboard/BudgetStatus";
import AddTransactionModal from "../components/Modals/AddTransactionModal";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    // PAGE BACKGROUND (IMPORTANT)
    <div className="bg-[#F7F8FA] min-h-screen">
      {/* CONTENT WRAPPER */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">
            <Dashboard />
            <TransactionTable />
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            <CategorySummary />
            <BudgetStatus />
          </div>
        </div>
      </div>

      {/* FLOATING ADD BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6
          bg-indigo-600 hover:bg-indigo-700
          text-white rounded-full
          w-14 h-14 text-2xl
          shadow-xl ring-4 ring-indigo-200
          flex items-center justify-center
          transition
        "
        aria-label="Add transaction"
      >
        +
      </button>

      {open && <AddTransactionModal onClose={() => setOpen(false)} />}
    </div>
  );
}
