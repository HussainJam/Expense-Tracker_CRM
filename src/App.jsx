import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
