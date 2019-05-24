import wepy from 'wepy'

export default class Request {
  static request(params) {
    params.url = 'http://192.168.2.106:3000' + params.url
    // params.url = 'http://localhost:3000' + params.url
    return wepy.request(params)
  }
}
