import axios, { type InternalAxiosRequestConfig } from 'axios'

const http = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  }
})

const requestInterceptor = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig<any> => {
  const refreshToken = localStorage.getItem('refreshToken')

  if (refreshToken != null) request.headers.Authorization = `Bearer ${refreshToken}`

  return request
}

http.interceptors.request.use(requestInterceptor)

export { http }
