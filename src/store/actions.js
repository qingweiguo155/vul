import * as types from './mutation-types.js'

export default {
    setDropdownList ({commit, state}, params) {
        commit(types.DROPDOWN_LIST, params)
    },
    setType ({commit, state}, params) {
        commit(types.TYPE, params)
    }
}