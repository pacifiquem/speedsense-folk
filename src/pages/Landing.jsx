import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import {
  GaugeIcon,
  ShieldIcon,
  BarChartIcon,
  AlertTriangleIcon,
  CarIcon,
  CpuIcon,
  BellIcon,
  ShieldCheckIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (user) navigate("/app");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <header className="border-b border-gray-800">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <div className="flex items-center space-x-2">
            <GaugeIcon className="w-8 h-8" />
            <span className="text-xl font-bold">SpeedSense</span>
          </div>
          {/* Hamburger Menu Icon for Mobile */}
          <button
            className="text-white md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? (
              <XIcon className="w-8 h-8" />
            ) : (
              <MenuIcon className="w-8 h-8" />
            )}
          </button>
          {/* Navigation links */}
          <nav
            className={`md:flex space-x-12 ${
              isMobileMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            <ul className="flex flex-col mr-12 space-y-4 md:flex-row md:space-y-0 md:space-x-12">
              <li>
                <a href="#features" className="hover:text-gray-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-gray-300">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="h-[70vh] py-20 text-center flex flex-col justify-center items-center">
          <h1 className="mb-4 text-5xl font-bold">Speed Detection & Monitor</h1>
          <p className="mb-8 text-xl">
            Enhance road safety with cutting-edge technology
          </p>
          <Button
            className="w-48 text-black bg-white hover:bg-gray-200"
            onClick={() => {
              navigate("/login");
            }}
          >
            Get Started
          </Button>
        </section>

        <section id="features" className="py-20 bg-gray-900">
          <div className="container px-4 mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center">
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <ShieldIcon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="mb-2 text-xl font-semibold">
                  Advanced Detection
                </h3>
                <p className="text-gray-400">
                  Accurate speed monitoring using state-of-the-art sensors
                </p>
              </div>
              <div className="text-center">
                <BarChartIcon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="mb-2 text-xl font-semibold">
                  Real-time Analytics
                </h3>
                <p className="text-gray-400">
                  Instant data processing and reporting for quick action
                </p>
              </div>
              <div className="text-center">
                <AlertTriangleIcon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="mb-2 text-xl font-semibold">Automated Alerts</h3>
                <p className="text-gray-400">
                  Immediate notifications for speed limit violations
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container px-4 mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center">
              How It Works
            </h2>
            <div className="flex flex-wrap justify-around">
              <Card className="bg-gray-800 border-gray-700 w-full md:w-[20%] mb-4 md:mb-0">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <CarIcon className="w-12 h-12 mb-4" />
                  <h3 className="mb-2 text-lg font-semibold">Monitoring</h3>
                  <p className="text-gray-400">
                    Vehicles passing through are monitored in real-time
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 w-full md:w-[20%] mb-4 md:mb-0">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <CpuIcon className="w-12 h-12 mb-4" />
                  <h3 className="mb-2 text-lg font-semibold">Processing</h3>
                  <p className="text-gray-400">
                    Data is processed and analyzed instantly
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 w-full md:w-[20%] mb-4 md:mb-0">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <BellIcon className="w-12 h-12 mb-4" />
                  <h3 className="mb-2 text-lg font-semibold">Alerting</h3>
                  <p className="text-gray-400">
                    Speed limit violations trigger automated alerts
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 w-full md:w-[20%]">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <ShieldCheckIcon className="w-12 h-12 mb-4" />
                  <h3 className="mb-2 text-lg font-semibold">Action</h3>
                  <p className="text-gray-400">
                    Authorities take immediate action to ensure road safety
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-900">
          <div className="container px-4 mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold">
              Ready to enhance road safety?
            </h2>
            <p className="mb-8 text-xl">
              Get in touch with us to learn more about implementing SpeedSense
              in your area.
            </p>
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-black border-gray-700"
                />
                <Button className="w-full text-black bg-white hover:bg-gray-200">
                  Contact Us
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-gray-800">
        <div className="container px-4 mx-auto text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SpeedSense. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
