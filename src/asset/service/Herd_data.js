import axios from "axios";
import { createContext } from "react";

export const HerdsContext = createContext();

export const HerdsContextProvider = ({ children }) => {

const handleGet = async (name, limit, page,search) => {
    try {
      const response = await axios.get(`/herds?sort=${name},-start_date&limit=${limit}&page=${page}&searchQuery=${search}`);
      return response.data.herds;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
const handleCreate = async (data) => {
    try {
      await axios.post("/herds",data);
      alert("Create Success");
    } catch (error) {
      console.log("Error:", error);
    }
  };
const handleDelete = async (product) => {
    try {
      await axios.delete(`/herds/${product._id}`, product);
      alert("xóa thành công");
    } catch (error) {
      console.log("Error:", error);
    }
  };


  const handleGetCategory = async () => {
    try {
      const response = await axios.get("/categories");
      return response.data.categories;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleGetFarm = async () => {
    try {
      const response = await axios.get("/farm");
      return response.data.farms;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <HerdsContext.Provider value={{ handleGet, handleCreate, handleDelete,handleGetCategory,handleGetFarm}}>
      {children}
    </HerdsContext.Provider>
  );
};

