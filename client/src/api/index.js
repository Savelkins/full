import axios from "axios";
import CONSTANTS from "../constants";

const apiClient = axios.create({
  baseURL: CONSTANTS.API_BAZE_URL,
});

export const fetchAllSports = () => apiClient.get("/sports");

export const fetchSportById = (id) => apiClient.get(`/sports/${id}`);

export const fetchCreateSport = (formData) =>
  apiClient.post("/sports", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSportById = (id, formData) =>
  apiClient.patch(`/sports/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteSportById = (id) => apiClient.delete(`/sports/${id}`);
