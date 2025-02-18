import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../service/auth.service";
import { UserType } from "../../types/user.type";

const SigninPage = () => {
  const [user, setUser] = useState<Partial<UserType>>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const data = await signIn(user as UserType);
      if (data.access_token) {
        localStorage.setItem("jwtToken", data.access_token);
      } else {
        throw new Error("Invalid token");
      }
      setUser({});
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center text-gray-900"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl w-full bg-white shadow-xl sm:rounded-xl flex flex-col p-12">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
          Welcome Back
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label
              className="block text-blue-500 mb-2 text-lg">
              Email
            </label>
            <input
              onChange={handleChange}
              id="email"
              value={user.email}
              name="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 bg-gray-50 text-blue-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-blue-500 mb-2 text-lg">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              value={user.password}
              name="password"
              placeholder="Enter your password"
              className="w-full px-5 py-3 bg-gray-50 text-blue-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-blue-500 mt-6 text-lg">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
