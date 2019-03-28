import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URI
});

let countLoadingIndicator = 0

api.interceptors.request.use(async config => {
  countLoadingIndicator++
  
  document.body.classList.add('loading-indicator')

  return config
})

api.interceptors.response.use(async response => {
  if (countLoadingIndicator === 1) {
    document.body.classList.remove('loading-indicator')
  }
  
  countLoadingIndicator--
  
  return response
})

export default api