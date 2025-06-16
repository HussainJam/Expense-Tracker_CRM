import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expenseData) => {
    const newExpense = {
      ...expenseData,
      id: Date.now().toString(),
      amount: Number(expenseData.amount),
    };
    setExpenses((prev) => [...prev, newExpense]);
    return newExpense;
  };

  const editExpense = (id, expenseData) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...expenseData } : exp))
    );
    return { id, ...expenseData };
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        editExpense,
        removeExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);
