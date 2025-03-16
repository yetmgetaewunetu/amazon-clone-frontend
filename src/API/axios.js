import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon-clone-backend-jyht.onrender.com", // Replace with your API base URL
});

export default instance;
