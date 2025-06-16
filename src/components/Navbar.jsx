
import { Link } from "react-router-dom";
import "./Navbar.css"; 

export default function Navbar() {
  return (
    // <nav className="navbar">
    <nav className="custom-navbar">

      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src="/vite2.jpeg"
            alt="Logo"
            className="logo"
          />
          <span className="brand-text">Alaa Mohra CRM</span>
        </Link>
       
      </div>
    </nav>
  );
}
