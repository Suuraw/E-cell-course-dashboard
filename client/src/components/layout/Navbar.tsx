import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from "../ui/button";
import Sidebar from './Sidebar';

interface NavbarProps
{
openSection:number|null;
toggleSection:(index:number)=>void;
}
const Navbar: React.FC<NavbarProps> = ({openSection,toggleSection}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="sticky top-0  bg-black text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-lg md:text-xl font-bold">E-CELL</span>
            <div className="flex items-center gap-4">
              {/* <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
                <a href="#" className="hover:text-gray-300 transition-colors">About</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Events</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
              </div> */}
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
      
        />
      </div>
    </>
  );
};

export default Navbar;