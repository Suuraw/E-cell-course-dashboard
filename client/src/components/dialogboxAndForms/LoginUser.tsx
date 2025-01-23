import React, { useState } from "react";
import ReatDom from "react-dom";
import { AnimatePresence } from "framer-motion";
import { AnimatedAlert } from "../animation/AnimatedAlert";
const BACKEND_URL = import.meta.env.VITE_SERVER_URL+"/auth/userLogin" || "http://localhost:3000/auth/userLogin";


interface LoginDialogProps {
  loginUser: boolean;
  updateLoginStatusUser: (status: boolean) => void;
  setOpenCloseUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginDialogUser: React.FC<LoginDialogProps> = ({
  setOpenCloseUser,
  updateLoginStatusUser,
  loginUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState<'success' | 'error' | null>(null);

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    const response = await fetch(`${BACKEND_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.ok) {
      setLoginStatus('success');
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-life", "20hr");
      
      setTimeout(() => {
        setOpenCloseUser(false);
        updateLoginStatusUser(true);
      }, 1000);
    } else {
      setLoginStatus('error');
    }
  };
  if (loginUser) return null;
  return ReatDom.createPortal(
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Login</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <button
          onClick={() => setOpenCloseUser((prev) => !prev)}
          className="mt-4 w-full text-center text-blue-500 hover:underline"
        >
          Cancel
        </button>
      </div>
      <AnimatePresence>
        {loginStatus && (
          <AnimatedAlert
            message={loginStatus === 'success' ? 'Login successful!' : 'Login failed. Please try again.'}
            type={loginStatus}
          />
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default LoginDialogUser;
