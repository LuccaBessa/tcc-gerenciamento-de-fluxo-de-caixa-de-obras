import axios, { type InternalAxiosRequestConfig } from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  }
})

const requestInterceptor = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig<any> => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken != null) request.headers.Authorization = `Bearer ${accessToken}`

  return request
}

http.interceptors.request.use(requestInterceptor)

export { http }
