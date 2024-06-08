import axios from "axios"

export const Api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
