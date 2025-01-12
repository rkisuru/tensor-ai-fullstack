import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/tensor/ask";

export const fetchResponse = async (question) => {
  try {
    const response = await axios.post(
      API_URL,
      { question },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUserImage = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/user/image",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/user", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteChat = async (id) => {
  try {
    const response = await axios.delete(
      "http://localhost:8080/api/v1/tensor/chats",
      {
        params: { id: id },
        withCredentials: true,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error deleting chat:", error);
  }
};
