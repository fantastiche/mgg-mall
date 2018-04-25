import * as types from './mutation-types'

export const showMask = function ({commit, state}) {
  commit(types.SHOW_MASK, true)
}

export const hideMask = function ({commit, state}) {
  commit(types.SHOW_MASK, false)
}
