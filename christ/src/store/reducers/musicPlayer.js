import { handleActions } from 'redux-actions'
import { PLAY_MUSIC, PAUSE_MUSIC, STOP_MUSIC, RESET_MUSIC, FAVORITE_MUSIC, ON_EVENT, OFF_EVENT, PLAY_TYPE } from '../types/musicPlayer'
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
    // 设置
    bgaManager.src = action.payload.source_url + '?time=' + Date.now()
    bgaManager.title = action.payload.name
    // bgaManager.autoplay = true
    // 改变状态
    return {
      ...state,
      duration: bgaManager.duration,
      music_payload: action.payload,
      source_url: action.payload.source_url,
      music_name: action.payload.name,
      music_id: action.payload.id,
      isPlaying: false,
      favorite: !!action.payload.favorite
    }
  },
  [PLAY_MUSIC] (state) {
    if (state.music_id) {
      // 播放
      const bgaManager = wepy.getBackgroundAudioManager()
      if (bgaManager.paused) {
        bgaManager.play()
      }
      return {
        ...state,
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
      if (!bgaManager.paused && bgaManager.currentTime === 0.0) {
        bgaManager.stop()
      }
      return {
        ...state,
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
  [ON_EVENT] (state, action) {
    const { type = '', fn } = action.payload
    if (state.music_id) {
      const bgaManager = wepy.getBackgroundAudioManager()
      if (type === 'ended') {
        state.events[type] = fn
        bgaManager.onEnded(fn)
      } else if (type === 'timeUpdate') {
        state.events[type] = fn
        bgaManager.onTimeUpdate(fn)
      }
    }
    return state
  },
  [OFF_EVENT] (state, action) {
    // const { type = '' } = action.payload
    // if (state.music_id) {
    //   const bgaManager = wepy.getBackgroundAudioManager()
    //   if (type === 'ended' && state.events[type]) {
    //     bgaManager.offEnded(state.events[type])
    //     delete state.events[type]
    //   } else if (type === 'timeUpdate') {
    //     bgaManager.offTimeUpdate(state.events[type])
    //     delete state.events[type]
    //   }
    // }
    return state
  },
  [PLAY_TYPE] (state, action) {
    return {
      ...state,
      playType: action.payload.playType || 2
    }
  }
}, {
  isPlaying: false,
  music_id: 0,
  duration: 0,
  favorite: false,
  playType: 2, // 1 单曲循环 2 列表循环
  music_payload: null,
  events: {}
})
