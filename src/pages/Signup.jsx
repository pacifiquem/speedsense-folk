import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GaugeIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, user } = useAuth();
  const navigate = useNavigate();

  if (user) navigate("/app");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <GaugeIcon className="w-12 h-12 text-blue-500" />
              <span className="ml-2 text-3xl font-bold text-gray-800">
                SpeedSense
              </span>
            </div>
            <p className="text-gray-500">Access your SpeedSense account</p>
          </div>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
          <div className="text-center">
            <p className="text-gray-500">
              Already Have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 underline hover:text-blue-600"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
