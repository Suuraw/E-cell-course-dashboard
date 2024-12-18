import axios from "axios";

// route for getting week 1 data
export const getWeek1Data=async()=> {
  try {
    const response = await axios.get("http://localhost:3000/api/week1Data");
    
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
export const getWeek2Data=async()=> {
    try {
      const response = await axios.get("http://localhost:3000/api/week2Data");
      
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
export const getWeek3Data=async()=> {
    try {
      const response = await axios.get("http://localhost:3000/api/week3Data");
      
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
      const response = await axios.get("http://localhost:3000/api/week4Data");
      
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
export const getWeek5Data=async()=> {
    try {
      const response = await axios.get("http://localhost:3000/api/week5Data");
      
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
export const getCapstoneData=async()=> {
    try {
      const response = await axios.get("http://localhost:3000/api/capstoneData");
      
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
export const getAssessmentData=async()=> {
    try {
      const response = await axios.get("http://localhost:3000/api/assessmentData");
      
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
  
  

