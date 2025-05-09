import axios from "axios";
import CONSTANTS from "../constants";

const apiClient = axios.create({
  baseURL: CONSTANTS.API_BAZE_URL,
});

export const fetchAllSports = () => apiClient.get("/sports");

export const fetchSportById = (id) => apiClient.get(`/sports/${id}`);
