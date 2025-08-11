import React, { useState } from "react";

function passwordStrength(password) {
  if (!password) return "";
  if (password.length < 6) return "Weak";
  if (
    password.match(/[A-Z]/) &&
    password.match(/[0-9]/) &&
    password.length >= 8
  )
    return "Strong";
  return "Medium";
}

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
    phone: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Password match check
    if (form.password !== form.confirm) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Prepare payload as backend expects
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phone, // match backend key
        role:
          form.role === "User"
            ? "USER"
            : form.role === "Facility Owner"
            ? "FACILITY_OWNER"
            : "ADMIN"
      };

      const res = await fetch(
        "https://dd183bddabf9.ngrok-free.app/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || "Account created! Please sign in.");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirm: "",
          role: "",
          phone: ""
        });
      } else {
        setError(data.message || "Sign up failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <form
        className="max-w-lg w-full p-8 bg-white rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          Create Your QuickCourt Account
        </h2>
        <p className="mb-6 text-gray-600">
          Sign up as User, Facility Owner, or Admin to get started.
        </p>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <label className="block mb-1 font-medium">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={form.email}
          onChange={handleChange}
        />

        {/* Phone Number */}
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          name="phone"
          type="tel"
          placeholder="e.g. +91 9876543210"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={form.phone}
          onChange={handleChange}
        />

        {/* Role Dropdown */}
        <label className="block mb-1 font-medium">Role</label>
        <select
          name="role"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
          value={form.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="User">User</option>
          <option value="Facility Owner">Facility Owner</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Password */}
        <label className="block mb-1 font-medium">Create Password</label>
        <div className="relative mb-2">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            required
            className="w-full p-2 border border-gray-300 rounded"
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
        <div className="mb-4 text-sm">
          Password strength:
          <span className="font-bold"> {passwordStrength(form.password)}</span>
        </div>

        {/* Confirm Password */}
        <label className="block mb-1 font-medium">Confirm Password</label>
        <input
          name="confirm"
          type="password"
          placeholder="Confirm password"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={form.confirm}
          onChange={handleChange}
        />

        {/* Terms */}
        <div className="flex items-center mb-4">
          <input type="checkbox" id="terms" required className="mr-2" />
          <label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <a href="#" className="text-green-600 underline">
              Terms & Privacy Policy
            </a>
          </label>
        </div>

        {/* Messages */}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 rounded font-semibold transition bg-green-600 text-white hover:bg-green-700"
        >
          Sign Up
        </button>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <span>Already have an account? </span>
          <a href="/signin" className="text-green-600 font-bold">
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;