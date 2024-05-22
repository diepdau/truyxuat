import axios from "axios";

export const handleGet = async (name, token) => {
    try {
        const response = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/processors?sort=${name}`, {
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
        const res = await axios.post("https://agriculture-traceability.vercel.app/api/v1/processors", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (error) {
        console.log("Error:", error);
    }
};

export const handleDelete = async (_id, token) => {
    try {
        await axios.delete(`https://agriculture-traceability.vercel.app/api/v1/processors/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("Error:", error);
    }
};

export const handleUpdate = async (_id, data, token) => {
    try {
        const res = await axios.patch(`https://agriculture-traceability.vercel.app/api/v1/processors/${_id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (error) {
        console.log("Error: ", error);
    }
};
export const getProductInfos = async () => {
    try {
        const res = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/product-infos?limit=60`);
        return (res.data.products);
    } catch (error) {
        console.log(error);
    }
};

export const getProduct = async () => {
    try {
        const res = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/harvests?limit=60`);
        return (res.data.harvests);
    } catch (error) {
        console.log(error);
    }
};
export const getFarm = async () => {
    try {
        const res = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/farms?limit=80&searchQuery=Nhà`);
        return (res.data.farms);
    } catch (error) {
        console.log(error);
    }
};

export const handleGetProcProduct = async (token) => {
    try {
        const response = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/processors/products`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log("Error: ", error);
    }
};
