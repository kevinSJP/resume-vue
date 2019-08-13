import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8083/',
  baseURL: 'https://imc.bii.com.cn/rect/',
  timeout: 15000,
  headers: [{ 'Content-Type': 'application/x-www-form-urlencoded' }, { 'X-Custom-Header': 'foobar' }]
})

axios.interceptors.request.use(config => {
  return config
}, err => {
  // Vue.prototype.$message.error('请求超时')
  return Promise.resolve(err)
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
