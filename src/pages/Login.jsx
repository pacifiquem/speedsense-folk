import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GaugeIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  if (user) navigate("/app");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen text-white bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-lg subtle-glow">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <GaugeIcon className="w-12 h-12 text-blue-400 animate-pulse" />
                <span className="ml-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  SpeedSense
                </span>
              </div>
              <p className="text-gray-400">Access your SpeedSense account</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-white transition duration-200 bg-gray-700 border border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  placeholder="Enter your email"
                />
                <label
                  htmlFor="email"
                  className="absolute px-1 text-xs font-medium text-gray-400 transition-all duration-200 bg-gray-800 -top-2 left-2"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-white transition duration-200 bg-gray-700 border border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  placeholder="Enter your password"
                />
                <label
                  htmlFor="password"
                  className="absolute px-1 text-xs font-medium text-gray-400 transition-all duration-200 bg-gray-800 -top-2 left-2"
                >
                  Password
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white transition duration-200 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            <div className="text-center">
              <p className="text-gray-400">
                New to SpeedSense?{" "}
                <Link
                  to="/signup"
                  className="text-blue-400 underline transition duration-200 hover:text-blue-300"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        .subtle-glow {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(147, 51, 234, 0.2);
          animation: subtle-pulse 3s infinite;
        }
        @keyframes subtle-pulse {
          0% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(147, 51, 234, 0.2);
          }
          50% {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4), 0 0 25px rgba(147, 51, 234, 0.3);
          }
          100% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(147, 51, 234, 0.2);
          }
        }
      `}</style>
    </div>
  );
}
