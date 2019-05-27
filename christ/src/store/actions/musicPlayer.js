import { FAVORITE_MUSIC } from '../types/musicPlayer'
import Request from '@/utils/request'
// import { createAction } from 'redux-actions'
import MusicTool from '@/utils/MusicTool'
import wepy from 'wepy'
import AccountTool from '@/utils/AccountTool'

export const nextMusic = id => {
  // 下一首
  Request.request({
    url: '/music/mini/next',
    data: {
      music_id: id,
      playType: wepy.$store.getState().musicPlayer.playType
    },
    mehtod: 'GET',
    success: ({ data }) => {
      if (data.code === 20000) {
        MusicTool.resetMusic({
          ...(data.data),
          origin: true
        })
        MusicTool.playMusic()
      } else {
        MusicTool.stopMusic()
      }
    },
    fail: () => {
    }
  })
}

export const prevMusic = id => {
  // 上一首
  Request.request({
    url: '/music/mini/prev',
    data: {
      music_id: id,
      playType: wepy.$store.getState().musicPlayer.playType
    },
    mehtod: 'GET',
    success: ({ data }) => {
      if (data.code === 20000) {
        MusicTool.resetMusic({
          ...(data.data),
          origin: true
        })
        MusicTool.playMusic()
      } else {
        MusicTool.stopMusic()
      }
    },
    fail: () => {
    }
  })
}

export const favoriteMusic = status => {
  // 收藏
  Request.request({
    url: '/favorite/mini/favorite',
    method: 'POST',
    data: {
      music_id: wepy.$store.getState().musicPlayer.music_id,
      openid: AccountTool.getOpenid(),
      status: status
    },
    success: ({data}) => {
      wepy.$store.dispatch({
        type: FAVORITE_MUSIC,
        payload: {
          favorite: status
        }
      })
    },
    fail: () => {
      wepy.$store.dispatch({
        type: FAVORITE_MUSIC,
        payload: {
          favorite: false
        }
      })
    },
    complete: () => {

    }
  })
}
