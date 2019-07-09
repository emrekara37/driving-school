import axios from 'axios';
const API_BASE = "https://localhost:5001/";
const http = axios.create({
    baseURL: API_BASE
});

export default http;
