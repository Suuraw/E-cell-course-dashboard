import React, { useState } from "react";
import {deleteAssessmentData } from "../../api/dataApi";
import "primeicons/primeicons.css";

interface CapstoneItemProps {
  link: string;
  deadline: string;
  instruction: string;
  id: string;
  isAdmin: boolean;
  onDelete: (id: string) => void; 
}

export const AssessmentItem: React.FC<CapstoneItemProps> = ({
  // link,
  // deadline,
  // instruction,
  // id,
  // isAdmin,
  // onDelete,
}) => {
  // const [isRemoving, setIsRemoving] = useState(false);

  // const handleDelete = async () => {
  //   console.log("Delete Button is clicked");
  //   setIsRemoving(true); 
  //   try {
  //     await deleteAssessmentData(id);
  //     console.log("Deleted");
  //     onDelete(id);
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  return (

    //Hard coded data only used for testing remove entire div in prod


    <div>
      <div className="border border-gray-300 rounded-lg my-4 p-4">
        <div className="flex flex-col md:flex-row my-4">
          <div className="w-full md:w-20 mx-2 mb-2 md:mb-0">
            <span className="font-bold">Instruction</span>
          </div>
          <div className="md:w-full md:pl-10 mb-4 md:mb-0">
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui perferendis, reprehenderit asperiores inventore nulla aliquid quidem aperiam consectetur! Quibusdam, deserunt.</p>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg my-4 p-4">
        <div className="flex flex-col md:flex-row my-4">
          <div className="w-full md:w-20 mx-2 mb-2 md:mb-0">
            <span className="font-bold">Link</span>
          </div>
          <div className="md:w-full md:pl-10 mb-4 md:mb-0">
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur impedit nesciunt voluptatibus officia molestias temporibus praesentium. Fugiat officiis consequatur itaque.</p>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg my-4 p-4">
        <div className="flex flex-col md:flex-row my-4">
          <div className="w-full md:w-20 mx-2 mb-2 md:mb-0">
            <span className="font-bold">Deadline</span>
          </div>
          <div className="md:w-full md:pl-10 mb-4 md:mb-0">
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur impedit nesciunt voluptatibus officia molestias temporibus praesentium. Fugiat officiis consequatur itaque.</p>
          </div>
        </div>
      </div>
    </div>
    
    // <div
    //   className={`border border-gray-300 rounded-lg my-4 p-4 ${
    //     isRemoving ? "opacity-0 transition-opacity duration-500" : ""
    //   }`}
    // >
    //   <div className="flex flex-col md:flex-row justify-between items-center my-4">
    //     <div className="flex flex-col md:flex-row flex-wrap w-full">
    //       <div className="w-full md:w-1/4 mx-2 mb-2 md:mb-0">
    //         <a
    //           href={link}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="font-bold text-blue-600 hover:text-blue-800"
    //         >
    //           {link}
    //         </a>
    //       </div>
    //       <div className="w-full md:w-1/4 mx-2 mb-2 md:mb-0">
    //         <span className="font-semibold">{deadline}</span>
    //       </div>
    //       <div className="w-full md:w-1/3 mx-2 mb-2 md:mb-0">
    //         <p className="font-semibold text-sm">{instruction}</p>
    //       </div>
    //     </div>
    //     {isAdmin && (
    //       <div className="ml-auto mt-2 md:mt-0">
    //         <button onClick={handleDelete} className="p-2">
    //           <i
    //             className="pi pi-spin pi-trash"
    //             style={{ fontSize: "1rem" }}
    //           ></i>
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};
