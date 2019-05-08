// import { RESET_MUSIC } from '../types/musicPlayer'
import Request from '@/utils/request'
// import { createAction } from 'redux-actions'
import MusicTool from '@/utils/MusicTool'

export const nextMusic = id => {
  // 下一首
  Request.request({
    url: '/music/mini/next',
    data: {
      music_id: id
    },
    mehtod: 'GET',
    success: ({ data }) => {
      if (data.code === 20000) {
        MusicTool.resetMusic(data.data)
        MusicTool.playMusic()
      }
    },
    fail: () => {
    }
  })
}
