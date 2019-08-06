import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8083/',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
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

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${axiosInstance}${url}`,
    params: params,
    headers: {
      'accessToken': ''
    }
  })
}

export const postRequest = (url, data) => {
  return axios({
    method: 'post',
    url: `${axiosInstance}${url}`,
    data: JSON.stringify(data)
    // withCredentials: true
  })
}

export const putRequest = (url, data) => {
  return axios({
    method: 'put',
    url: `${axiosInstance}${url}`,
    data: JSON.stringify(data)
  })
}

export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${axiosInstance}${url}`,
    params: params
  })
}

export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${axiosInstance}${url}`,
    params: params
  })
}
