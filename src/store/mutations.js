import * as types from './mutation-types.js'

export default {
    [types.DROPDOWN_LIST] (state, params) {
        state.dropdownList = params
    },
    [types.TYPE] (state, params) {
        state.type = params
    },
}