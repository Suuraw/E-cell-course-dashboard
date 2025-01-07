import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from "../ui/button";
import Sidebar from './Sidebar';


interface NavbarProps {
  openSection: number | null;
  toggleSection: (index: number) => void;
  updateLoginStatus: (status: boolean) => void;
  login: boolean;
  loginUser: boolean;
  updateLoginStatusUser: (status: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ openSection, toggleSection, updateLoginStatus, login,loginUser,updateLoginStatusUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "Welcome to Our Cohort",
    "Empowering Innovators",
    "Build. Launch. Scale.",
    "Ignite Your Entrepreneurial Spirit"
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 15000); 
    return () => clearInterval(interval);
  }, [messages.length]);
  

  return (
    <>
      <nav className="sticky top-0 bg-black text-white shadow-md z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-lg md:text-xl font-bold">E-CELL</span>
            <div className="flex-1 overflow-hidden relative sliding-text-container">
              <div className="sliding-text-wrapper">
                <span key={currentMessageIndex} className="sliding-text">
                  {messages[currentMessageIndex]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white md:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={toggleSidebar} />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          openSection={openSection}
          toggleSection={toggleSection}
          updateLoginStatus={updateLoginStatus}
          login={login}
          loginUser={loginUser}
          updateLoginStatusUser={updateLoginStatusUser}
        />
      </div>
    </>
  );
};

export default Navbar;
