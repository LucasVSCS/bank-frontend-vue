import axios from 'axios'
import Cookie from 'js-cookie'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    Authorization: 'Bearer ' + Cookie.get('_capg-bank_token'),
    'Content-Type': 'application/json'
  }
})

export default instance
