import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(
        "https://dd183bddabf9.ngrok-free.app/api/v1/auth/logout",
        {
          method: "POST",
          credentials: "include",
          headers: { "ngrok-skip-browser-warning": "true" }
        }
      );
    } catch (err) {
      console.error("Logout failed", err);
    }
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-green-600">
        QuickCourt
      </Link>

      {/* Menu Links */}
      <div className="flex items-center gap-6">
        {!isLoggedIn ? (
          <>
            {/* Guest Links */}
            <Link
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-100"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {/* Authenticated Links */}
            <Link to="/my-bookings" className="hover:text-green-600">
              My Bookings
            </Link>
            <Link to="/profile" className="hover:text-green-600">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;