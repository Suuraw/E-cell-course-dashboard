import React from "react";
import { BookOpen, Clock, Info } from "lucide-react";

interface DescriptionBoxProps {
  title?: string;
  description: string;
  timeToRead?: string;
  category?: string;
}

const DescriptionBox: React.FC<DescriptionBoxProps> = ({
  title = "Course Overview",
  description,
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-lg border border-blue-100">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 rounded-full p-3">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
