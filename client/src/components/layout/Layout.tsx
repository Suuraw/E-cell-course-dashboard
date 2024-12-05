import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CourseAnnouncement from "../course/CourseAnnouncement";
import Dashboard from "../course/Dashboard";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-1 flex">
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="fixed h-screen w-64">
            <Sidebar />
          </div>
        </div>

        <div className="flex-1">
          <div className="p-4 mt-5">
            <CourseAnnouncement />
          </div>

          <div className="p-4">
            <Dashboard />
          </div>
          <div className="p-4 mt-5">
           <Footer/>
          </div>

          <main className="p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;