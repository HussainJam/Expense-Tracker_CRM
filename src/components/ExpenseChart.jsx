import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {
  const chartData = useMemo(() => {
    const categoryData = expenses.reduce((acc, expense) => {
      acc[expense.category] =
        (acc[expense.category] || 0) + Number(expense.amount);
      return acc;
    }, {});

    const backgroundColors = Object.keys(categoryData).map(
      () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`
    );

    return {
      labels: Object.keys(categoryData),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(categoryData),
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
  }, [expenses]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  }, [expenses]);

  return (
    <div className="expense-chart">
      <h2>Spending Overview</h2>
      {expenses.length > 0 ? (
        <>
        {/* chart view */}
          <div
            className="chart-container"
            style={{ width: "250px", height: "250px" }}
          >
            <Pie data={chartData} />
          </div>

          <div className="chart-summary">
            <p>
              Total Expenses: <strong>${totalExpenses.toFixed(2)}</strong>
            </p>
            <p>
              Categories:{" "}
              <strong>{Object.keys(chartData.labels).length}</strong>
            </p>
          </div>
        </>
      ) : (
        <p className="no-data">No expense data available for visualization</p>
      )}
    </div>
  );
}
