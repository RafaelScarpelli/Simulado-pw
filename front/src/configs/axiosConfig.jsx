import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;

//process.env.REACT_APP_API_BASE_URL || 