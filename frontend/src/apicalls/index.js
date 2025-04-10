import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://quiz-quest-latest-backend.vercel.app/',
    headers: {
       'authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance


