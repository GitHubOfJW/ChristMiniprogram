import { SHOW_LOADING, HIDE_LOADING } from '@/store/types/csLoading'
import wepy from 'wepy'

class CsLoading {
  static showLoading () {
    this.startTime = Date.now()
    wepy.$store.dispatch({
      type: SHOW_LOADING,
      payload: 1
    })
  }

  static hideLoading (options) {
    const { success } = options
    const offsetTime = Date.now() - this.startTime
    if (offsetTime >= 1500) {
      wepy.$store.dispatch({
        type: HIDE_LOADING,
        payload: 0
      })
      if (success && typeof success === 'function') {
        success()
      }
    } else {
      const id = setTimeout(() => {
        clearTimeout(id)
        wepy.$store.dispatch({
          type: HIDE_LOADING,
          payload: 0
        })
        if (success && typeof success === 'function') {
          success()
        }
      }, 1500)
    }
  }
}

CsLoading.prototype.startTime = 0

export default CsLoading
