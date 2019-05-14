import { handleActions } from 'redux-actions'
import { PLAY_MUSIC, PAUSE_MUSIC, STOP_MUSIC, RESET_MUSIC, FAVORITE_MUSIC, ON_EVENT, OFF_EVENT } from '../types/musicPlayer'
import wepy from 'wepy'
export default handleActions({
  [RESET_MUSIC] (state, action) {
    // 如果当前已经有实例那就先销毁
    if (state.musicInstance) {
      // 判断传过来的id 是否更当前的一样
      if (action.payload.id === state.music_id) {
        return {
          ...state,
          isPlaying: !state.musicInstance.paused
        }
      } else {
        // 停止 销毁
        state.musicInstance.stop()
        state.musicInstance.destroy()
      }
    }
    // 设置
    const instance = wepy.createInnerAudioContext()
    instance.src = action.payload.source_url

    // 改变状态
    return {
      ...state,
      music_name: action.payload.name,
      music_id: action.payload.id,
      isPlaying: false,
      favorite: !!action.payload.favorite,
      musicInstance: instance
    }
  },
  [PLAY_MUSIC] (state) {
    if (state.musicInstance) {
      // 播放
      state.musicInstance.play()
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
    if (state.musicInstance) {
      state.musicInstance.pause()
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
    if (state.musicInstance) {
      state.musicInstance.stop()
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
    if (state.musicInstance) {
      if (type === 'ended') {
        state.events[type] = fn
        state.musicInstance.onEnded(fn)
      }
    }
    return state
  },
  [OFF_EVENT] (state, action) {
    const { type = '' } = action.payload
    if (state.musicInstance) {
      if (type === 'ended' && state.events[type]) {
        state.musicInstance.offEnded(state.events[type])
        delete state.events[type]
      }
    }
    return state
  }
}, {
  isPlaying: false,
  music_id: 0,
  musicInstance: null,
  favorite: false,
  events: {}
})
