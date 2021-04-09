import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
// import interceptors from './interceptors'

// interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class httpRequest {
  constructor() {
    this.baseOptions = async function(params, method = "GET") {
      let { url, data } = params
      const BASE_URL = getBaseUrl(url)
      let contentType = "application/json"
      contentType = params.contentType || contentType
      const option = {
        url: BASE_URL + url,
        data: data,
        method: method,
        header: {
          'content-type': contentType,
          'Authorization': Taro.getStorageSync('Authorization')
        }
      }
      return await Taro.request(option)
    }

    this.get = (url, data = "") => {
      let option = { url, data }
      return this.baseOptions(option)
    }

    this.post = function(url, data, contentType) {
      let params = { url, data, contentType }
      return this.baseOptions(params, "POST")
    }
  }
}

export default new httpRequest()
