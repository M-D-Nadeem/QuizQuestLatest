import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://quiz-quest-latest-backend-fkaf8iefr-md-nadeems-projects.vercel.app//',
    headers: {
       'authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance


