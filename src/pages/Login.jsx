import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { GaugeIcon } from "lucide-react";

const Login = () => {
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
    <div className="flex items-center justify-center w-full min-h-screen text-white bg-black">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <GaugeIcon className="w-12 h-12 text-white" />
                <span className="ml-2 text-2xl font-bold">SpeedSense</span>
              </div>
              <p className="text-gray-400">Access your SpeedSense account</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute px-1 text-xs font-medium text-gray-300 bg-gray-900 -top-2 left-2"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-white transition duration-200 bg-gray-800 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="absolute px-1 text-xs font-medium text-gray-300 bg-gray-900 -top-2 left-2"
                >
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-white transition duration-200 bg-gray-800 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-black transition duration-200 bg-white rounded-md hover:bg-gray-200"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center">
              <p className="text-gray-400">
                New to SpeedSense?{" "}
                <Link
                  to="/signup"
                  className="text-white underline transition duration-200 hover:text-gray-300"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
