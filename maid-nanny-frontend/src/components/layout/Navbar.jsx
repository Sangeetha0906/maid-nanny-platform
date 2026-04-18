import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xl">M</div>
        <span className="font-display font-bold tracking-tight text-xl text-slate-800">Maid&Nanny</span>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        {(!role) && (
          <>
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-primary-600 transition-colors">How it Works</Link>
            <Link to="/contact" className="hover:text-primary-600 transition-colors">Contact</Link>
          </>
        )}

        {(role === 'household') && (
          <>
            <Link to="/search" className="hover:text-primary-600 transition-colors">Find a Helper</Link>
            <Link to="/bookings" className="hover:text-primary-600 transition-colors">My Bookings</Link>
          </>
        )}
        {(role === 'helper') && (
          <>
            <Link to="/helper/dashboard" className="hover:text-primary-600 transition-colors">Dashboard</Link>
            <Link to="/helper/requests" className="hover:text-primary-600 transition-colors">Job Requests</Link>
          </>
        )}
        {(role === 'admin') && (
          <>
            <Link to="/admin/dashboard" className="hover:text-primary-600 transition-colors">Analytics</Link>
            <Link to="/admin/verify" className="hover:text-primary-600 transition-colors">Verify Profiles</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {!role ? (
          <>
            <Button variant="ghost" onClick={() => navigate("/login")}>Log In</Button>
            <Button variant="primary" onClick={() => navigate("/register")}>Sign Up</Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={handleLogout}>Log Out</Button>
        )}
      </div>
    </nav>
  );
};
