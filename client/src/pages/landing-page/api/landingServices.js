import axiosInstance from "@/api/axiosInstance";
import { toast } from 'react-toastify';

export const getAllTeachers = async () => {
    try {
        const response = await axiosInstance.get("/teachers");
        return response.data;
    } catch (error) {
        console.error("Error fetching teachers:", error);   
        toast.error("Failed to load teachers");
        throw error;
    }
};

export const getAllCourses = async () => {
    try {
        const response = await axiosInstance.get("/landing/course");
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
        throw error;
    }
};

export const createSubscriber = async (data) => {
    try {
        const dt = String(data.email).toLowerCase();
        const response = await axiosInstance.post("/landing/subscribe", { email: dt });
        toast.success("Successfully subscribed!");
        return response.data;
    } catch (error) {
        console.error("Error creating subscriber:", error);
        toast.error("Failed to create subscriber");
        throw error;
    }
};