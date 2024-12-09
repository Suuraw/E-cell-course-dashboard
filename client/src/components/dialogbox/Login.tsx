import React, { useState } from "react";
import ReatDom from "react-dom";
interface LoginDialogProps {
  // isOpen: boolean;

  setOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ setOpenClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    // onLogin(email, password);

    const response = await fetch("https://dashboard-backend-service.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      alert("Login Successfull");
    } else {
      alert("Login failed");
    }
  };

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
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          onClick={() => setOpenClose((prev) => !prev)}
          className="mt-4 w-full text-center text-blue-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>,
    document.body
  );
};

export default LoginDialog;
