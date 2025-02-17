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
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl sm:rounded-xl flex flex-col p-12">
        <h1 className="text-4xl font-extrabold text-center text-black mb-8">
          Create an Account
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label className="block text-black mb-2 text-lg" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-white bg-opacity-50 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black mb-2 text-lg" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-white bg-opacity-50 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black mb-2 text-lg" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-white bg-opacity-50 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-black mt-6 text-lg">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
