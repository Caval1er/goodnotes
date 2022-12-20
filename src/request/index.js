import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
})
//请求拦截器
service.interceptors.request.use()
//响应拦截器
service.interceptors.response.use((response) => {
  const code = response.data.code
  let data = response.data.data
  if (code !== '0') {
    if (code === '201') {
      data = Array.prototype.map.call(data, (item) => {
        item.properties = JSON.parse(item.properties)
        return item
      })
    } else if (code === '301') {
      data.schema = JSON.parse(data.schema)
    } else if (code === '100') {
      data = JSON.parse(data)
    } else if (code === '302') {
      data = Array.prototype.map.call(data, (item) => {
        item.schema = JSON.parse(item.schema)
        return item
      })
    }
    return data
  }
})
export default service
