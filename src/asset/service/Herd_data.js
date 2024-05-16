import axios from "axios";

export const handleGet = async (name, token) => {
    try {
        const response = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/herds?sort=${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.herds;
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const handleCreate = async (data, token) => {
    try {
        await axios.post("https://agriculture-traceability.vercel.app/api/v1/herds", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Error:", error);
    }
};

export const handleDelete = async (product, token) => {
    try {
        await axios.delete(`https://agriculture-traceability.vercel.app/api/v1/herds/${product._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Error:", error);
    }
};
export const handleUpdate = async (_id,data, token) => {
    try {
       const res= await axios.patch(`https://agriculture-traceability.vercel.app/api/v1/herds/${_id}`,data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (error) {
        console.log("Error:", error);
    }
};
export const handleGetCategory = async (token) => {
    try {
        const response = await axios.get("https://agriculture-traceability.vercel.app/api/v1/categories?limit=50",);
        return response.data.categories;
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const handleGetFarm = async (token) => {
    try {
        const response = await axios.get("https://agriculture-traceability.vercel.app/api/v1/farm?limit=50&searchQuery=ạ", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.farms;
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const fetchAllHerds = async (limit, page, token) => {
    try {
        const response = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/herds?limit=${limit}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.herds;
    } catch (error) {
        console.log("Error: ", error);
    }
};
export const fetchHerd = async (herdId,token)=> {
    try {
      const res = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/herds/${herdId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data.herd;
} catch (error) {
    console.log("Error: ", error);
}
  };
export const createNewAutoHerd = async (herdId, quantity, token) =>{
  try {
     await axios.post(`https://agriculture-traceability.vercel.app/api/v1/herds/${herdId}/generate-animals`, {
          quantity: quantity,
          headers: {
            Authorization: `Bearer ${token}`
        }
      });
  } catch (error) {
      console.error("Error:", error);
  }
}





export const handleCreateAnimal = async (data, token) => {
    try {
        await axios.post("https://agriculture-traceability.vercel.app/api/v1/animals", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Error:", error);
    }
};

export const handleDeleteAnimal = async (_id, token) => {
    try {
        await axios.delete(`https://agriculture-traceability.vercel.app/api/v1/animals/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Error:", error);
    }
};
export const handleUpdateAnimal = async (_id,data, token) => {
    try {
       const res= await axios.patch(`https://agriculture-traceability.vercel.app/api/v1/animals/${_id}`,data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (error) {
        console.log("Error:", error);
    }
};