import axios from "axios"

export const Api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
})

// Menambahkan interceptors untuk menambahkan token ke setiap permintaan
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
