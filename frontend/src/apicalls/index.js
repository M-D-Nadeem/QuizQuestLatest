import axios from 'axios'
console.log(process.env.REACT_APP_BASE_URL);
const axiosInstance = axios.create({
    // baseURL: 'https://quiz-quest-latest-backend.vercel.app/',
    
    
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
       'authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance


