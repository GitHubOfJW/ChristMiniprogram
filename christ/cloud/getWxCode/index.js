// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 先判断本地有没有二维码图片
    const wxContext = cloud.getWXContext()
    const result = await cloud.openapi.wxacode.getUnlimited({
      scene: 'id=' + wxContext.OPENID.substring(0, 28)
    })
    return result
  } catch (err) {
    return err
  }
}
