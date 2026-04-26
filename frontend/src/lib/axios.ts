import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ,// Adjust the base URL as needed
  withCredentials: true, // Include cookies in requests if needed
})

