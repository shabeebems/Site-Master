import apiClient from "@/lib/axiosClient";
import axios from "axios";

// Check and validate datas
export const apiCheck = async (data: object, route: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/${route}`, data, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error("Error during authentication", error);
        throw error;
    }
}

// Get datas for contractor
export const fetchDetails = async (route: string) => {
    try {
        const response = await apiClient.get(`http://localhost:5000/api/contractor/${route}`, { withCredentials: true })
        return response?.data.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

// Get datas of single (equipment / project / worker) with _id
export const fetchSingleData = async (route: string, _id: string) => {
    try {
        const response = await apiClient.get(`http://localhost:5000/api/contractor/${route}/${_id}`, { withCredentials: true })
        return response?.data.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

// Patch works
export const statusEdits = async (route: string, data: object) => {
    try {
        const response = await apiClient.patch(`http://localhost:5000/api/contractor/${route}`, data, { withCredentials: true })
        return response?.data.data
    } catch (error) {
        console.error("Error during fetching workers", error);
        throw error;
    }
}

export const checkEquipmentCount = async (data: object, route: string) => {
    try {
        const response = await apiClient.post(`http://localhost:5000/api/contractor/${route}`, data, { withCredentials: true })
        return response?.data
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



