import wepy from 'wepy'
import Request from '@/utils/request'
export default class AccountTool {
  static getOpenid() {
    const openid = wepy.getStorageSync('openid')
    return openid
  }
  // 获取openid
  static login(callback) {
    wepy.checkSession({
      success: (data) => {
        const openid = wepy.getStorageSync('openid')
        if (openid) {
          // 如果session 没过期就可以获取个人信息
          if (callback && typeof callback === 'function') {
            callback()
          }
          return
        }
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
      },
      fail: () => {
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
    })
  }

  // 获取access_token
  static getAccessToken(callback) {
    // 判断本地是否有
    const appInfo = wepy.getStorageSync('appInfo')
    const tokenData = wepy.getStorageSync('acc_token')
    // 如果存储的时间已过期 或 第一次获取 则发送请求获取新的token 否则直接获取
    if (!tokenData || tokenData.expireTime < (Date.now() / 1000)) {
      Request.request({
        abUrl: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appInfo.appid + '&secret=' + appInfo.secret,
        method: 'GET',
        success: ({data}) => {
          const accessToken = data.access_token
          // 过期时间 - 60秒 保险起见
          const expireTime = data.expires_in - 20 + (Date.now() / 1000) // moment().add(data.expires_in - 60, 'seconds').toString()
          // 保存
          wepy.setStorage({
            key: 'acc_token',
            data: {
              expireTime: expireTime,
              access_token: accessToken
            }
          })
          // 未过期，调用回调
          if (callback && typeof callback === 'function') {
            callback(accessToken)
          }
        }
      })
    } else {
      // 未过期，调用回调
      if (callback && typeof callback === 'function') {
        callback(tokenData.access_token)
      }
    }
  }
}
