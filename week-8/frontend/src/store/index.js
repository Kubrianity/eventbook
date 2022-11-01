import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    events: [],
    event: {},
    users: [],
    user: {}
  },
  getters: {
    isAuthenticated: state => state.user._id
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
    fetchEvents({ commit }) {
      axios.get(`${process.env.VUE_APP_API_URL}/events/all/json`)
      .then(result => commit('SET_EVENTS', result.data))
    },
    fetchEvent({ commit }, id) {
      axios.get(`${process.env.VUE_APP_API_URL}/events/${id}/json`)
      .then(result => commit('SET_EVENT', result.data))
    },
    fetchUsers({ commit }) {
      axios.get(`${process.env.VUE_APP_API_URL}/person/all/json`)
      .then(result => commit('SET_USERS', result.data))
    },
    fetchUser({ commit }, id) {
      axios.get(`${process.env.VUE_APP_API_URL}/person/${id}/json`)
      .then(result => commit("SET_USER", result.data))  
    },
    async register({commit}, user) {
      try {
        const result = await axios.post(`${process.env.VUE_APP_API_URL}/auth/register`, user)
        commit('SET_USER', result.data)
        router.push('/user/profile')
      }
      catch(err) {
        console.log(err)
        return
      }
    },
    async logIn({commit}, user) {
      try {
        const result = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, user)
        commit('SET_USER', result.data)
        router.push('/user/profile')
      }
      catch(err) {
        console.log(err)
        return
      }
    },
    async logOut({commit}) {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/auth/logout`)
        commit('SET_USER', {})
      }
      catch(err) {
        console.log(err)
      }     
    },
    // User updates profile
    updateProfile(context , payload) {
      axios.patch(`${process.env.VUE_APP_API_URL}/person/${payload.userId}`, { username : payload.username })
        .then(() => context.dispatch('fetchUser', payload.userId))
    },
    // User creates an event
    addEvent(context, payload) {
      axios.post(`${process.env.VUE_APP_API_URL}/events`, { userId: payload.userId, formInfo: payload.formDetail })
        .then(result => context.dispatch('fetchEvent', result.data._id))
    },
    // User attends an event
    attendEvent(context , payload) {
      axios.post(`${process.env.VUE_APP_API_URL}/person/register/${payload.eventId}`, { userId: payload.userId })
        .then(() => context.dispatch('fetchUser', payload.userId))
    },
    // User updates an event
    updateEvent(context , payload) {
      axios.put(`${process.env.VUE_APP_API_URL}/events/${payload.eventId}`, payload.form)
        .then(() => context.dispatch('fetchEvent', payload.eventId))
    },
    // User deletes an event
    deleteEvent(context , id) {
      axios.delete(`${process.env.VUE_APP_API_URL}/events/${id}`)
    },
    // User makes a comment 
    makeComment(context, payload) {
      axios.post(`${process.env.VUE_APP_API_URL}/person/events/${payload.eventId}/comments`, { userId: payload.userId, comment: payload.commentDetail })
        .then(() => context.dispatch('fetchEvent', payload.eventId))
    },
    // User connects with another user
    connect(context, payload) {
      axios.post(`${process.env.VUE_APP_API_URL}/person/contacts/${payload.targetId}`, { userId: payload.userId })
        .then(() => context.dispatch('fetchUser', payload.userId))
      }   
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })]
})
