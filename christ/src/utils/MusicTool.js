import wepy from 'wepy'
import { RESET_MUSIC, PLAY_MUSIC, STOP_MUSIC, PAUSE_MUSIC, FAVORITE_MUSIC, PLAY_TYPE, CHANGE_LOADING } from '@/store/types/musicPlayer'
export default class MusicTool {
  // 修改waiting状态
  static changeWait(waiting = false) {
    wepy.$store.dispatch({
      type: CHANGE_LOADING,
      payload: {
        waiting: waiting
      }
    })
  }

  // 修改播放类型
  static changePlayType(playType = 1) {
    wepy.$store.dispatch({
      type: PLAY_TYPE,
      payload: {
        playType: playType % 3
      }
    })
  }
  // 重置音乐
  static resetMusic({id = 0, source_url, name, is_sale, favorite, origin = false}) {
    // 设置音乐
    wepy.$store.dispatch({
      type: RESET_MUSIC,
      payload: {
        id: id,
        source_url: source_url,
        name: name,
        is_sale: is_sale,
        favorite: !!favorite,
        origin: origin
      }
    })
  }

  // 播放音乐
  static playMusic () {
    const tempCurrentTime = wepy.$store.getState().musicPlayer.tempCurrentTime
    // 如果时间大于0
    if (tempCurrentTime > 0) {
      const music = wepy.$store.getState().musicPlayer.music_payload
      this.resetMusic({
        ...music,
        origin: true
      })
    }

    wepy.$store.dispatch({
      type: PLAY_MUSIC
    })
    this.changeWait(false)
  }

  // 暂停音乐
  static pauseMusic () {
    wepy.$store.dispatch({
      type: PAUSE_MUSIC
    })
  }

  // 停止音乐
  static stopMusic () {
    wepy.$store.dispatch({
      type: STOP_MUSIC
    })
  }

  static favoriteMusic(status) {
    wepy.$store.dispatch({
      type: FAVORITE_MUSIC,
      payload: {
        favorite: status
      }
    })
  }
}
