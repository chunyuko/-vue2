/**
 * axios 配置
 */

import { TOKEN } from '@/constant'
import { storageSession } from '@/utils/storage'
import axios from 'axios'
import qs from 'qs'

class Request {
  // axios 实例对象
  instance = null
  // 取消重复请求
  CancelToken = axios.CancelToken
  // url 请求集合
  pending = []
  // 不必做防抖的接口白名单
  exceptUrl = []
  constructor(config) {
    // 创建 axios 实例
    this.instance = axios.create(config)
    this.interceprtorsObj = config.interceptors
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  // 取消重复请求
  removePending(config) {
    this.pending.map((item, index) => {
      if (item.url === `${config.url}/request_type=${config.method}`) {
        item.cancel()
        this.pending.splice(index, 1)
      }
    })
  }
  // 请求拦截
  httpInterceptorsRequest() {
    this.instance.interceptors.request.use(
      (config) => {
        //#region 重复请求处理
        if (!this.exceptUrl.includes(config.url)) {
          // this.removePending(config)
          config.cancelToken = new this.CancelToken((c) => {
            const obj = {
              url: `${config.url}/request_type=${config.method}`,
              cancel: c,
            }
            this.pending.push(obj)
          })
        }
        //#endregion
        config.headers.Authorization = 'Bearer ' + storageSession.getItem(TOKEN)
        // console.log('请求拦截11')
        // console.log('请求拦截111', config)

        return config
      },
      (error) => {
        // console.log('请求拦截1')

        return error
      }
    )
  }
  // 响应拦截
  httpInterceptorsResponse() {
    // console.log('响应拦截')

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('-----res---', res)

        // this.removePending(res.config)
        // console.log('-----res---', res)

        return res
      },
      (error) => {
        // console.log('响应拦截--')

        if (error.response) {
          // console.log('响应拦截11--')

          // console.log('-----error.response---', error.response)
          const status = parseInt(error.response.status)
          // console.log('响应拦截1221--')
          // console.log('响应拦截122111--', status)

          if (status === 401) {
            return null
          } else if (status === 403) {
            return null
          } else if (status === 404) {
            return null
          } else if (status === 500) {
            return null
          }
          return null
        }
        // console.log('-----error.response00---', error)

        // console.log('-----error.response19---', res)
        // console.log('-----error.response1---', error.res)
        // console.log('-----error.response1---', error.response)

        // return error.response
      }
    )
  }
  // get 请求
  get(url, params = {}) {
    const qsParams = qs.stringify(params)
    let urlSuffix = ''
    if (qsParams) {
      urlSuffix = `?${qsParams}`
    }
    return this.instance
      .get(url + urlSuffix)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return error
      })
  }
  // post 请求
  post(url, data = {}) {
    // console.log('post res data', data)

    // const qsData = qs.stringify(data)
    const qsData = qs.stringify(data).replaceAll('%20', ' ').replaceAll('%3A', ':')
    // qsData = qsData
    // console.log('post res daqsDatata', )
    // console.log('post res daqsDatata', qsData)
    // console.log('post res daqsDatata', qsData)
    let urlSuffix = ''
    if (qsData) {
      urlSuffix = `?${qsData}`
    }
    // console.log('post res urlSuffix', urlSuffix)

    return this.instance
      .post(url, qs.stringify(data))
      .then(
        (res) => {
          // console.log('url + urlSuffix', url + urlSuffix)
          // console.log('post res uu', res)
          // console.log('post res.RecordFullValue', res.RecordFullValue)
          // if (res.data) {
          return res.data ? res.data : res
          // } else {
          //   return res
          // }
        }
        // ,(err) => {
        //   return err.res
        // }
      )
      .catch((error) => {
        // console.log('post error')
        // console.log('post error33', error)
        // console.log('post error1', error.res)
        // console.log('post error2', error.response)

        return error
      })
  }
  // 通用请求
  request(method, url, params = {}) {
    const qsParams = qs.stringify(params)
    let urlSuffix = ''
    if (qsParams) {
      urlSuffix = `?${qsParams}`
    }
    const config = { method: method, url: url + urlSuffix }
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 文件提交
  filePost(url, data) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, data)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export { Request }
