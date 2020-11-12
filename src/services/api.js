import axios from 'axios'

const api = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://ip-api.com/json',
})

export default api