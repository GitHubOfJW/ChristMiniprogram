import { handleActions } from 'redux-actions'
import { SHOW_LOADING, HIDE_LOADING } from '../types/csLoading'

export default handleActions({
  [SHOW_LOADING] (state) {
    return {
      ...state,
      isPageLoading: true
    }
  },
  [HIDE_LOADING] (state) {
    return {
      ...state,
      isPageLoading: false
    }
  }
}, {
  isPageLoading: false
})
