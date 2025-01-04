import axios from "axios";

const BACKEND_API = import.meta.env.VITE_SERVER_URL+"/api" || "http://localhost:3000/api";

//route for getting week 1 data
export const getWeek1Data=async()=> {
  try {
    const response = await axios.get(`${BACKEND_API}/week1Data`);
    
    if (response.data && response.data.weekData) {
      return response;
    } else {
      console.log("Collection is Empty")
      return null;
    }
  } catch (error) {
    console.error("Error fetching week data:", error);
    throw new Error("Unable to fetch data from the API");
  }
}

// route for getting week 1 data
export const getWeek2Data=async()=> {
    try {
      const response = await axios.get(`${BACKEND_API}/week2Data`);
      
      if (response.data && response.data.weekData) {
        return response;
      } else {
        console.log("Collection is Empty")
        return null;
      }
    } catch (error) {
      console.error("Error fetching week data:", error);
      throw new Error("Unable to fetch data from the API");
    }
  }

export const getWeek3Data=async()=> {
    try {
      const response = await axios.get(`${BACKEND_API}/week3Data`);
      
      // Check if the response data contains the expected structure
      if (response.data && response.data.weekData) {
        return response; // returns { weekData: DayData[] }
      } else {
        console.log("Collection is Empty")
        return null;
      }
    } catch (error) {
      console.error("Error fetching week data:", error);
      throw new Error("Unable to fetch data from the API");
    }
  }

// route for getting week 1 data
export const getWeek4Data=async()=> {
    try {
      const response = await axios.get(`${BACKEND_API}/week4Data`);
      
      if (response.data && response.data.weekData) {
        return response;
      } else {
        console.log("Collection is Empty")
        return null;
      }
    } catch (error) {
      console.error("Error fetching week data:", error);
      throw new Error("Unable to fetch data from the API");
    }
  }

  
  // route for getting week 1 data
export const getWeek5Data=async()=> {
    try {
      const response = await axios.get(`${BACKEND_API}/week5Data`);
      
      if (response.data && response.data.weekData) {
        return response;
      } else {
        console.log("Collection is Empty")
        return null;
      }
    } catch (error) {
      console.error("Error fetching week data:", error);
      throw new Error("Unable to fetch data from the API");
    }
  }

  // route for getting week 1 data
export const getCapstoneData=async()=> {
    try {
      const response = await axios.get(`${BACKEND_API}/capstoneData`);
      
      if (response.data) {
        return response;
      } else {
        console.log("Collection is Empty")
        return null;
      }
    } catch (error) {
      console.error("Error fetching week data:", error);
      throw new Error("Unable to fetch data from the API");
    }
  }

  // route for getting week 1 data
export const getAssessmentData=async()=> {
    try {
      const response = await axios.get(`${BACKEND_API}/assessmentData`);
      
      if (response.data ) {
        return response;
      } else {
        console.log("Collection is Empty")
        return null;
      }
    } catch (error) {
      console.error("Error fetching week data:", error);
      throw new Error("Unable to fetch data from the API");
    }
  }
  
  

// Deleting specific capstone data using id as query parameter
export const deleteCapstoneData=async(id:string)=>{
  try {
    const response=await axios.delete(`${BACKEND_API}/deleteCapstoneData/${id}`);
    if(response.status===200)
    {
      return "Successfully deleted";
    }
    else
    {
      return "Some error occured";
    }
  } catch (error) {
   console.log('ERROR')
 }
}

//Deleting specific assessment data using id as query paramter
export const deleteAssessmentData=async(id:string)=>{
  try {
    const response=await axios.delete(`${BACKEND_API}/deleteAssessmentData/${id}`);
    if(response.status===200)
    {
      return "Successfully deleted";
    }
    else
    {
      return "Some error occured";
    }
  } catch (error) {
    console.log('ERROR')
 }
}