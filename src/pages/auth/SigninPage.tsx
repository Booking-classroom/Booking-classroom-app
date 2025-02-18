import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../service/auth.service";
import { UserType } from "../../types/user.type";
import { FaSignInAlt } from "react-icons/fa";

const SigninPage = () => {
  const [user, setUser] = useState<Partial<UserType>>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
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
      className="min-h-screen flex justify-center items-center text-black"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl w-full bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl sm:rounded-xl flex flex-col p-12">
        <h1 className="text-4xl font-extrabold text-center text-black mb-8">
          Welcome Back
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">

            <label className="block text-black mb-2 text-lg" htmlFor="email">

              Email
            </label>
            <input
              onChange={handleChange}
              id="email"
              value={user.email}
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
              onChange={handleChange}
              type="password"
              id="password"
              value={user.password}
              className="w-full px-5 py-3 bg-white bg-opacity-50 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-black bg-opacity-50 text-white font-semibold rounded-lg hover:bg-opacity-70 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
          >
            <FaSignInAlt size={20} /> Login
          </button>
        </form>
        <p className="text-center text-black mt-6 text-lg">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-black font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
