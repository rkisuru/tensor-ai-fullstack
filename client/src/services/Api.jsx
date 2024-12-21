import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/tensor/ask";

export const fetchResponse = async (question) => {
  try {
    const response = await axios.post(API_URL, { question });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
