import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'https://quiz-quest-latest-backend.vercel.app/',
    baseURL: process.env.VITE_BASE_URL,
    headers: {
       'authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance


