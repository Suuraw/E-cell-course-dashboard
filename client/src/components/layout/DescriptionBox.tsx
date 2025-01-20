import React, {useState} from "react";
import { BookOpen } from "lucide-react";

interface DescriptionBoxProps {
  title?: string;
  description: string;
  timeToRead?: string;
  category?: string;
}


const DescriptionBox: React.FC<DescriptionBoxProps> = ({title = "Course Overview", description,}) => {
  const [isMounted, setIsMounted] = useState(true);

  const cross = <img width="25" height="25" src="https://img.icons8.com/windows/50/cancel.png" alt="cancel" />;

  const handleClose = () => {
    setIsMounted(false);
  };

  return (
    isMounted && (<div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 shadow-lg border border-blue-100">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 rounded-full p-2 mt-1.5">
          <BookOpen className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 mt-2">{title}</h2>
            <button 
              onClick={handleClose}
              className="hover:opacity-75 transition-opacity w-5 h-5 mt-2"
            >
              {cross}
          </button>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">{description}</p>
        </div>
      </div>
    </div>
  ));
};

export default DescriptionBox;
