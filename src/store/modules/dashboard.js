import axios from 'axios'

const state = {
    data: []
}

const getters = {}

const actions = {
    async fetchData({ commit }) {
        const data = await axios.get('http://localhost:8000/api/display_data/')
        commit('setData', data)
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
