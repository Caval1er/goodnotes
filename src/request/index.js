import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
})
//请求拦截器
service.interceptors.request.use()
//响应拦截器
service.interceptors.response.use((response) => {
  if (response.data.code !== 0) {
    return response.data.data
  }
})
export default service
