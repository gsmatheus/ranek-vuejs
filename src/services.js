import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5500"
})

export const api = {
    get(endpoint) {
        return axiosInstance.get(endpoint)
    },
    post(endpoint, body) {
        return axiosInstance.post(endpoint, body)
    }
}