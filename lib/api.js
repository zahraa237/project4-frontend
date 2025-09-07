import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL;

const createSession = async (data) => {
  try {
    const response = await axios.post(`${URL}/session/new`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
