import * as types from './mutation-types'

const mutations = {
  [types.SHOW_MASK] (state, mask) {
    state.mask = mask
  }
}

export default mutations
