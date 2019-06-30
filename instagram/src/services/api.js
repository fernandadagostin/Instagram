import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://localhost:3333'
    baseURL: 'http://192.168.0.111:3333'
    //192.168.0.111
})

export default api