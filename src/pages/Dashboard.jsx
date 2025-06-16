import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";

export default function Dashboard() {
  const { expenses, addExpense, editExpense, removeExpense } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleAddExpense = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    if (editingExpense) {
      await editExpense(editingExpense.id, data);
    } else {
      await addExpense(data);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      removeExpense(id);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Expense Tracker</h1>
        <button onClick={handleAddExpense} className="btn-add">
          Add New Expense
        </button>
      </header>

      <ExpenseChart expenses={expenses} />

      <ExpenseList
        expenses={expenses}
        onEdit={(expense) => {
          setEditingExpense(expense);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <ExpenseForm
          expenseToEdit={editingExpense}
          onCancel={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
