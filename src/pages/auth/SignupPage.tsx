import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../types/user.type"; 
import { signUp } from "../../service/auth.service";

const SignupPage = () => {
  const [user, setUser] = useState<Partial<UserType>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await signUp(user as UserType);
      setUser(data);
      setSuccess("Account created successfully");
      navigate("/login");
    } catch (error) {
      setError("Invalid email or password");
    }
  }


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
                value={user.username}
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
                value={user.email}
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
                value={user.password}
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
