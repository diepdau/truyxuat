import axios from "axios";



export const handleCreate = async (data, token) => {
    try {
        const res = await axios.post("https://agriculture-traceability.vercel.app/api/v1/farms", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.farm;
    } catch (error) {
        console.log("Error:", error);
    }
};

export const handleDelete = async (_id, token) => {
    try {
        await axios.delete(`https://agriculture-traceability.vercel.app/api/v1/farms/${_id}`, {
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
        const res = await axios.patch(`https://agriculture-traceability.vercel.app/api/v1/farms/${_id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.farm;
    } catch (error) {
        console.log("Error: ", error);
    }
};