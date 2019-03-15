import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

api.interceptors.request.use(async config => {
  document.body.classList.add('loading-indicator')

  return config
})

api.interceptors.response.use(async response => {
  document.body.classList.remove('loading-indicator')

  return response
})

export default api