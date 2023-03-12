import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:7033/api",
  headers: {
    "Content-type": "application/json"
  }
});