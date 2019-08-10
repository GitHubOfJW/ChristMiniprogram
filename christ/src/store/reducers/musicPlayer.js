import { handleActions } from 'redux-actions'
import { PLAY_MUSIC, PAUSE_MUSIC, STOP_MUSIC, RESET_MUSIC, FAVORITE_MUSIC, PLAY_TYPE, CHANGE_LOADING } from '../types/musicPlayer'
import wepy from 'wepy'
export default handleActions({
  [RESET_MUSIC] (state, action) {
    // 如果当前已经有实例那就先销毁
    const bgaManager = wepy.getBackgroundAudioManager()
    if (state.music_id && action.payload.id === state.music_id && !action.payload.origin) {
      return {
        ...state,
        isPlaying: !bgaManager.paused
      }
    }
    bgaManager.src = action.payload.source_url + '?time=' + Date.now()
    bgaManager.title = action.payload.name
    let tempCurrentTime = state.tempCurrentTime
    // 如果当前音乐
    if (state.music_id && action.payload.id !== state.music_id) {
      tempCurrentTime = -1
    }
    bgaManager.autoplay = false
    // 如果下架了，则停止播放
    if (!action.payload.is_sale) {
      bgaManager.stop()
    }
    // 改变状态
    return {
      ...state,
      duration: bgaManager.duration,
      music_payload: action.payload,
      source_url: action.payload.source_url,
      music_name: action.payload.name,
      music_id: action.payload.id,
      isPlaying: false,
      is_sale: action.payload.is_sale,
      tempCurrentTime: tempCurrentTime,
      favorite: !!action.payload.favorite
    }
  },
  [PLAY_MUSIC] (state) {
    if (state.music_id) {
      // 播放
      const bgaManager = wepy.getBackgroundAudioManager()
      if (bgaManager.paused) {
        // 如果当前音乐
        bgaManager.play()
        if (state.tempCurrentTime > 0) {
          bgaManager.seek(state.tempCurrentTime)
        }
      }
      return {
        ...state,
        tempCurrentTime: -1,
        isPlaying: true
      }
    }
    return {
      ...state,
      isPlaying: false
    }
  },
  [PAUSE_MUSIC] (state) {
    if (state.music_id) {
      const bgaManager = wepy.getBackgroundAudioManager()
      if (!bgaManager.paused) {
        bgaManager.pause()
      }
      return {
        ...state,
        isPlaying: false
      }
    }
    return {
      ...state,
      isPlaying: false
    }
  },
  [STOP_MUSIC] (state) {
    if (state.music_id) {
      const bgaManager = wepy.getBackgroundAudioManager()
      // if (!bgaManager.paused && bgaManager.currentTime === 0.0) {
      //   bgaManager.stop()
      // }
      return {
        ...state,
        tempCurrentTime: bgaManager.currentTime,
        isPlaying: false
      }
    }
  },
  [FAVORITE_MUSIC] (state, action) {
    return {
      ...state,
      favorite: action.payload.favorite
    }
  },
  [PLAY_TYPE] (state, action) {
    return {
      ...state,
      playType: action.payload.playType || 2
    }
  },
  [CHANGE_LOADING] (state, action) {
    return {
      ...state,
      isWaiting: action.payload.waiting || false
    }
  }
}, {
  isPlaying: false,
  isWaiting: false,
  music_id: 0,
  duration: 0,
  is_sale: true,
  favorite: false,
  playType: 2, // 1 单曲循环 2 列表循环
  music_payload: null,
  tempCurrentTime: -1,
  events: {}
})
