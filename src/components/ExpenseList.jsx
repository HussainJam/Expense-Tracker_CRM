import { format } from "date-fns";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <p className="no-expenses">
        No expenses recorded yet. Add your first expense!
      </p>
    );
  }

  return (
    <div className="expense-list-container">
      <h3>Expense Records</h3>
      <div className="table-responsive">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{format(new Date(expense.date), "MMM dd, yyyy")}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.paymentMethod}</td>
                <td className="actions">
                  <button onClick={() => onEdit(expense)} className="btn-edit">
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
