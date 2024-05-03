import axios from "axios";
import { createContext } from "react";

export const HerdsContext = createContext();

export const HerdsContextProvider = ({ children }) => {

const handleGet = async (name) => {
    try {
      const response = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/herds?sort=${name}`);
      return response.data.herds;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
const handleCreate = async (data) => {
    try {
      await axios.post("https://agriculture-traceability.vercel.app/api/v1/herds",data);
      alert("Create Success");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
const handleDelete = async (product) => {
    try {
      await axios.delete(`https://agriculture-traceability.vercel.app/api/v1/herds/${product._id}`, product);
      alert("xóa thành công");
    } catch (error) {
      console.log("Error:", error);
    }
  };


  const handleGetCategory = async () => {
    try {
      const response = await axios.get("https://agriculture-traceability.vercel.app/api/v1/categories?limit=50");
      return response.data.categories;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleGetFarm = async () => {
    try {
      const response = await axios.get("https://agriculture-traceability.vercel.app/api/v1/farm?limit=50");
      return response.data.farms;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const fetchAllHerds = async (limit,page) => {
    try {
      const response = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/herds?limit=${limit}&page=${page}`);
      return response.data.herds;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <HerdsContext.Provider value={{ handleGet, handleCreate, handleDelete,handleGetCategory,handleGetFarm,fetchAllHerds}}>
      {children}
    </HerdsContext.Provider>
  );
};

