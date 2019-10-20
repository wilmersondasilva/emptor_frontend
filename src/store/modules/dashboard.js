import axios from 'axios'

const state = {
    data: [],
    selectedIndicator: ''
}

const getters = {
    dataGroupedByIndicatorCode(state) {
        return state.data.reduce((dataGrouped, indicator) => {
            if (!dataGrouped[indicator.code]) {
                dataGrouped[indicator.code] = {
                    description: indicator.name,
                    data: []
                }
            }

            dataGrouped[indicator.code].data.push(indicator)

            return dataGrouped
        }, {})
    }
}

const actions = {
    async fetchData({ commit }) {
        const response = await axios.get('http://localhost:8000/api/display_data/')
        commit('setData', response.data)
    }
}

const mutations = {
    setData(state, payload) {
        state.data = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
