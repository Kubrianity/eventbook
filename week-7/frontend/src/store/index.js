import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    events: [],
    event: {},
    users: [],
    user: {}
  },
  getters: {
  },
  mutations: {
    SET_EVENTS(state, data) {
      state.events = data
    },
    SET_EVENT(state, data) {
      state.event = data
    },
    SET_USERS(state, data){
      state.users = data
    },
    SET_USER(state, data) {
      state.user = data
    }
  }, 
  actions: {
    async fetchEvents({ commit }) {
      const result = await axios.get('http://localhost:3000/events/all/json')
      commit('SET_EVENTS', result.data)
    },
    async fetchEvent({ commit }, id) {
      const result = await axios.get(`http://localhost:3000/events/${id}/json`)
      commit('SET_EVENT', result.data)
    },
    async fetchUsers({ commit }) {
      const result = await axios.get('http://localhost:3000/person/all/json')
      commit('SET_USERS', result.data)
    },
    async fetchUser({ commit }, id) {
      const result = await axios.get(`http://localhost:3000/person/${id}/json`);
      commit("SET_USER", result.data);
    },
    async logIn({commit}, user) {
      const result = await axios.post(`http://localhost:3000/auth/login`, user, { withCredentials: true, origin: 'http://localhost:8080'})
      if(!result.data) return
      commit('SET_USER', result.data)
      router.push('/user/profile')
    },
    async register({commit}, user) {
      const result = await axios.post(`http://localhost:3000/auth/register`, user, { withCredentials: true, origin: 'http://localhost:8080'})
      commit('SET_USER', result.data)
      router.push('/user/profile')
    },
    // User creates an event
    async addEvent(context, payload) {
      await axios.post("http://localhost:3000/events", { userId: payload.userId, formInfo: payload.formDetail })
        .then(() => context.dispatch('fetchEvents'))
        .then(router.push('/'))
    },
    // User attends an event
    async attendEvent(context , payload) {
      await axios.post(`http://localhost:3000/person/register/${payload.eventId}`, { userId: payload.userId })
        .then(() => context.dispatch('fetchUser', payload.userId))
        .then(router.push('/user/profile'))
    },
    // User deletes an event
    async deleteEvent(context , id) {
      const userId = this.state.user._id
      await axios.delete(`http://localhost:3000/events/${id}`)
        .then(() => context.dispatch('fetchUser', userId))
        .catch(err => console.log(err))
    },
    // User makes a comment 
    async makeComment(context, payload) {
      await axios.post(`http://localhost:3000/person/events/${payload.eventId}/comments`, { userId: payload.userId, comment: payload.commentDetail })
        .then(() => context.dispatch('fetchEvents'))
        .then(router.push('/'))
    },      
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })]
})
