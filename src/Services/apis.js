// api.js
import axios from "axios";

const BASE_URL = "http://localhost:8000";

// GET request
export const getAPI = async (endpoint, params) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, params);
        return response.data;
    } catch (error) {
        if (error?.response?.status === 401) {
            throw new Error(error.response)
        }
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error("Failed to fetch data");
        }
    }
};

// POST request
export const postAPI = async (endpoint, params) => {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, params);
        return response.data;
    } catch (error) {
        if (error?.response?.data?.statuscode === 401) {
            throw new Error(error.response)
        }
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error("Failed to fetch data");
        }
    }
};

// DELETE request
export const deleteAPI = async (endpoint, params) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${endpoint}`, params);
        return response.data;
    } catch (error) {
        if (error?.response?.data?.statuscode === 401) {
            throw new Error(error.response)
        }
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error("Failed to delete data");
        }
    }
};
