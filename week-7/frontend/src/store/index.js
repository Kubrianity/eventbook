import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    events: []
  },
  getters: {
  },
  mutations: {
    SET_EVENTS(state, data) {
      state.events = data
    }
  },
  actions: {
    async fetchEvents({ commit }) {
      const result = await axios.get('http://localhost:3000/events/all/json')
      commit('SET_EVENTS', result.data)
    }
  },
  modules: {
  }
})
