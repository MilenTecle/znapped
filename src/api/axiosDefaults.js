import axios from "axios"

// Set the default base URL for all axios requests
axios.defaults.baseURL = "https://znapped-drfapi-8eee30ca5ab2.herokuapp.com/"
// Ensure all POST requests send 'multipart/form-data' content type, for uploading files, form data etc.)
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

// Create separate axios instances for requests and responses
export const axiosReq = axios.create();
export const axiosRes = axios.create();