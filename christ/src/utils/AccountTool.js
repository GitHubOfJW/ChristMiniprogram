import wepy from 'wepy'
import Request from '@/utils/request'
export default class AccountTool {
  static getOpenid() {
    const openid = wx.getStorageSync('openid')
    return openid
  }
  // 获取openid
  static login(callback) {
    // const openid = wx.getStorageSync('openid')
    // if (openid) {
    //   if (callback && typeof callback === 'function') {
    //     callback()
    //   }
    //   return
    // }
    // 登录
    wepy.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          Request.request({
            url: '/user/mini/login',
            data: {
              code: res.code
            },
            success: ({data}) => {
              if (data.code === 20000) {
                wepy.setStorage({
                  key: 'openid',
                  data: data.data.openid
                })

                if (callback && typeof callback === 'function') {
                  callback()
                }
              }
            },
            fail: () => {
            }
          })
        }
      }
    })
  }
}
