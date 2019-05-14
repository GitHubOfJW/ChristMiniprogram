import wepy from 'wepy'
import { RESET_MUSIC, PLAY_MUSIC, STOP_MUSIC, PAUSE_MUSIC, FAVORITE_MUSIC, ON_EVENT, OFF_EVENT } from '@/store/types/musicPlayer'
import { nextMusic } from '@/store/actions/musicPlayer'
export default class MusicTool {
  // 播放结束
  static ended () {
    const id = wepy.$store.getState().musicPlayer.music_id
    nextMusic(id)
  }

  // 重置音乐
  static resetMusic ({ id = 0, source_url, name, favorite }) {
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
        favorite: !!favorite
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
