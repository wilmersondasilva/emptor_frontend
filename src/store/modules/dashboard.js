import axios from 'axios'

const state = {
    data: [],
    isModalVisible: false,
    indicatorToEdit: {},
    selectedIndicator: 'SP.POP.TOTL'
}

const getters = {
    indicatorsGroupedByCode(state) {
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
    },
    async editData(_config, data) {
        return axios.patch(`http://localhost:8000/api/display_data/${data.id}/`, data)
    },
    showModal({ commit }) {
        commit('setModalVisibility', true)
    },
    hideModal({ commit }) {
        commit('setModalVisibility', false)
    },
    selectIndicatorToEdit({ commit, state }, id) {
        const indicatorToEdit = state.data.find(item => item.id === id)
        commit('setIndicatorToEdit', indicatorToEdit)
    }
}

const mutations = {
    setData(state, payload) {
        state.data = payload
    },
    setModalVisibility(state, payload) {
        state.isModalVisible = payload
    },
    setIndicatorToEdit(state, payload) {
        state.indicatorToEdit = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
