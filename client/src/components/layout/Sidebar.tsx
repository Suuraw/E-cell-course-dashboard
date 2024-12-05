import { ChevronRight } from 'lucide-react';
import { Button } from "../ui/button";

import { menuItems, courseContents } from '../data/sidebarData';

function Sidebar() {
  return (
    <aside className="bg-gray-100 h-full border-r border-gray-200 flex flex-col">
      <div className="p-4 flex-shrink-0">
        <Button className="w-full mb-4 mt-5 bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors">
          <img width="20" height="20" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" className="mr-2" />
          Login with Google
        </Button>
      </div>
      
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        <nav className="p-4 space-y-6">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
              >
                <span className="text-xl p-1 rounded-md bg-white shadow-sm">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
          
          <hr className="border-gray-300" />
          
          <div>
            <h3 className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wider">
              Course Contents
            </h3>
            <div className="space-y-1 mb-12">
              {courseContents.map((content, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg bg-white p-1 rounded-md shadow-sm">{content.icon}</span>
                    <span className="text-sm font-semibold">{content.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;