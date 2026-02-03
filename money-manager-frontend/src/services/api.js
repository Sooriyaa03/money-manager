const BASE_URL = "https://money-manager-backend-s2oa.onrender.com/api";

/* ---------------- TRANSACTIONS ---------------- */

export const addTransaction = async (data) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to add transaction");
  }

  return res.json();
};

export const getTransactions = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/transactions?${params}`);

  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return res.json();
};

export const updateTransaction = async (id, data) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to update transaction");
  }

  return res.json();
};

/* ---------------- ANALYTICS ---------------- */

export const getAnalytics = async (type) => {
  const res = await fetch(`${BASE_URL}/analytics/${type}`);

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
};

export const getCategorySummary = async () => {
  const res = await fetch(`${BASE_URL}/analytics/category-summary`);

  if (!res.ok) {
    throw new Error("Failed to fetch category summary");
  }

  return res.json();
};

/* ---------------- BUDGET ---------------- */

export const setBudget = async (data) => {
  const res = await fetch(`${BASE_URL}/budgets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to set budget");
  }

  return res.json();
};

export const getBudgetStatus = async () => {
  const res = await fetch(`${BASE_URL}/budgets/status`);

  if (!res.ok) {
    throw new Error("Failed to fetch budget status");
  }

  return res.json();
};
