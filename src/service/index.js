/**
  timeout: 80000,
 * axios 实例【axios默认处理时间限制】
 */

import { Request } from './axios'

// axios 基础配置
const defaultConfig = {
  baseURL: process.env.VUE_APP_WEB_URL,
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin-Type': '*', //允许跨域
  },
}

// axios formData 配置
const fileConfig = {
  baseURL: process.env.VUE_APP_WEB_URL,
  timeout: 200000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin-Type': '*', //允许跨域
  },
}
// 文件导出
const exportConfig = {
  baseURL: process.env.VUE_APP_WEB_URL,
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin-Type': '*', //允许跨域
  },
  responseType: 'blob',
}

// axios 默认配置封装实例，用于请求时使用
export const http = new Request(defaultConfig)
// formData 等数据传输请求时使用
export const fileHttp = new Request(fileConfig)
export const exportHttp = new Request(exportConfig)
