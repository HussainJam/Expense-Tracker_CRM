import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useExpenses } from "../context/ExpenseContext";

const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];
const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer"];

const expenseSchema = z.object({
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required").max(100),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  receiptLink: z.string().url("Must be a valid URL").or(z.literal("")),
});

export default function ExpenseForm({ expenseToEdit, onCancel }) {
  const { addExpense, editExpense } = useExpenses();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: expenseToEdit || {
      date: new Date().toISOString().split("T")[0],
      category: "",
      description: "",
      amount: "",
      paymentMethod: "",
      receiptLink: "",
    },
  });

  const onSubmit = async (data) => {
    if (expenseToEdit) {
      await editExpense(expenseToEdit.id, data);
    } else {
      await addExpense(data);
    }
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{expenseToEdit ? "Edit Expense" : "Add New Expense"}</h2>
          <button className="close-button" onClick={onCancel}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="expense-form">
          <div className="form-group">
            <label htmlFor="date">Date*</label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className={errors.date ? "error" : ""}
            />
            {errors.date && (
              <span className="error-message">{errors.date.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              {...register("category")}
              className={errors.category ? "error" : ""}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="error-message">{errors.category.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <input
              id="description"
              type="text"
              {...register("description")}
              className={errors.description ? "error" : ""}
            />
            {errors.description && (
              <span className="error-message">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount*</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              {...register("amount", { valueAsNumber: true })}
              className={errors.amount ? "error" : ""}
            />
            {errors.amount && (
              <span className="error-message">{errors.amount.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method*</label>
            <select
              id="paymentMethod"
              {...register("paymentMethod")}
              className={errors.paymentMethod ? "error" : ""}
            >
              <option value="">Select payment method</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
            {errors.paymentMethod && (
              <span className="error-message">
                {errors.paymentMethod.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="receiptLink">Receipt Link (optional)</label>
            <input
              id="receiptLink"
              type="url"
              {...register("receiptLink")}
              className={errors.receiptLink ? "error" : ""}
              placeholder="https://example.com/receipt.jpg"
            />
            {errors.receiptLink && (
              <span className="error-message">
                {errors.receiptLink.message}
              </span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {expenseToEdit ? "Update" : "Add"} Expense
            </button>
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
