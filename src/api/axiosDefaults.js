import axios from "axios"

axios.defaults.baseURL = "https://znapped-drfapi-8eee30ca5ab2.herokuapp.com/"
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true