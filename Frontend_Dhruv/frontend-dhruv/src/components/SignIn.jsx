import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setIsLoggedIn }) => {
  const [role, setRole] = useState("User");
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://dd183bddabf9.ngrok-free.app/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important for session cookies
        body: JSON.stringify({ ...form, role }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setIsLoggedIn(true);

        // Redirect based on role
        if (role === "Facility Owner") {
          navigate("/owner/dashboard");
        } else if (role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || data.error || "Sign in failed");
      }
    } catch (err) {
      setLoading(false);
      setError("Server error, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <form
        className="max-w-md w-full p-8 bg-white rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          Welcome Back to QuickCourt
        </h2>
        <p className="mb-6 text-gray-600">
          Sign in to manage your bookings or facilities.
        </p>

        {/* Role Buttons */}
        <div className="mb-5 flex gap-4 justify-center">
          {["User", "Facility Owner", "Admin"].map((r) => (
            <button
              type="button"
              key={r}
              className="px-4 py-2 rounded font-semibold transition"
              style={{
                backgroundColor: role === r ? "#27272a" : "#f3f4f6",
                color: role === r ? "#fff" : "#27272a",
              }}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Email */}
        <label className="block mb-2 font-medium">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="w-full p-2 mb-4 border rounded"
          value={form.email}
          onChange={handleChange}
        />

        {/* Password */}
        <label className="block mb-2 font-medium">Password</label>
        <div className="relative mb-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Error */}
        {error && <div className="mb-4 text-red-600">{error}</div>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 rounded font-semibold transition"
          style={{ backgroundColor: "#27272a", color: "#fff" }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="mt-6 text-center">
          <span>Don’t have an account? </span>
          <a href="/signup" className="text-green-600 font-bold">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;