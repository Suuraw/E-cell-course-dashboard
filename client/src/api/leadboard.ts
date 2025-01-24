import axios from "axios";
const URL= import.meta.env.VITE_SERVER_URL+"/api/leadboardData"|| `http://localhost:3000/api/leadboardData`;
// const URL= import.meta.env.||`http://localhost:3000/api/leadboardData`;


type StudentEntry = [string, string];
// console.log(URL);
export const fetchLeadboard = async () => {
  try {
    const response = await axios.get(URL);
    const sheetData = response.data.studentData;
    console.log(sheetData);
    const students: StudentEntry[] = sheetData;
    return students;
  } catch (error) {
  throw new Error("Sever not responding");
  }
};
