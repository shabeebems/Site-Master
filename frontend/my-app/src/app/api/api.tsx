import apiClient from "@/lib/axiosClient";
import axios from "axios";

// Check and validate inputs
export const apiCheck = async (data: object, route: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/${route}`, data, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error("Error during authentication", error);
        throw error;
    }
}

// Get datas
export const fetchDetails = async (route: string) => {
    try {
        const response = await apiClient.get(`http://localhost:5000/api/contractor/${route}`, { withCredentials: true })
        // console.log(response.data)
        return response?.data.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

// Logout
export const logoutApi = async () => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/auth/logout`, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error("Error during Logout", error);
        throw error;
    }
}



