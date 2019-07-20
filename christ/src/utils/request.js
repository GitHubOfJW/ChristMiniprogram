import wepy from 'wepy'
import AccountTool from '@/utils/AccountTool'

export default class Request {
  static request(params) {
    // params.url = params.abUrl || 'http://192.168.2.108:3000' + params.url
    params.url = params.abUrl || 'https://api.banbeigeng.com' + params.url
    params.data = {
      ...(params.data || {}),
      openid: AccountTool.getOpenid()
    }
    // params.url = 'http://localhost:3000' + params.url
    return wepy.request(params)
  }
}
