import { Link } from "react-router-dom";
import { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("User created successfully!");
        setFormData({ username: "", email: "", password: "" });
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create user.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white shadow-xl sm:rounded-xl flex flex-col p-12">
          <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
            Create an Account
          </h1>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-600 text-center mb-4">{success}</p>
          )}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6">
              <label
                className="block text-blue-500 mb-2 text-lg"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-gray-50 text-blue-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-blue-500 mb-2 text-lg"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-gray-50 text-blue-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-blue-500 mb-2 text-lg"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-gray-50 text-blue-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-blue-500 mt-6 text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
