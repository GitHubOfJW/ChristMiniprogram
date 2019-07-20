import wepy from 'wepy'
import { RESET_MUSIC, PLAY_MUSIC, STOP_MUSIC, PAUSE_MUSIC, FAVORITE_MUSIC, ON_EVENT, OFF_EVENT, PLAY_TYPE, CHANGE_LOADING } from '@/store/types/musicPlayer'
import { nextMusic } from '@/store/actions/musicPlayer'
export default class MusicTool {
  // 播放结束
  static ended () {
    const id = wepy.$store.getState().musicPlayer.music_id
    // 如果播放类型是单曲
    nextMusic(id)
  }

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

  // 添加事件
  static addMusicListener({type, fn}) {
    // 先移除
    this.removeMusicListener({type: type})
    // 再添加
    if (fn && typeof fn === 'function') {
      wepy.$store.dispatch({
        type: ON_EVENT,
        payload: {
          type: type,
          fn: fn
        }
      })
    }
  }

  static removeMusicListener({type, fn}) {
    if (fn && typeof fn === 'function') {
      wepy.$store.dispatch({
        type: OFF_EVENT,
        payload: {
          type: type,
          fn: fn
        }
      })
    }
  }

  // 重置音乐
  static resetMusic({id = 0, source_url, name, favorite, origin = false}) {
    wepy.$store.dispatch({
      type: OFF_EVENT,
      payload: {
        type: 'ended',
        fn: this.ended
      }
    })

    // 设置音乐
    wepy.$store.dispatch({
      type: RESET_MUSIC,
      payload: {
        id: id,
        source_url: source_url,
        name: name,
        favorite: !!favorite,
        origin: origin
      }
    })

    wepy.$store.dispatch({
      type: ON_EVENT,
      payload: {
        type: 'ended',
        fn: this.ended
      }
    })
  }

  // 播放音乐
  static playMusic () {
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
