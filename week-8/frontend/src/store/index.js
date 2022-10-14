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
    async fetchEvents({ commit }) {
      try {
        const result = await axios.get(`${process.env.VUE_APP_API_URL}/events/all/json`)
        commit('SET_EVENTS', result.data)
      }
      catch(err) {
        console.log(err)
      }
    },
    async fetchEvent({ commit }, id) {
      try {
        const result = await axios.get(`${process.env.VUE_APP_API_URL}/events/${id}/json`)
        commit('SET_EVENT', result.data)
      }
      catch(err) {
        console.log(err)
      }
    },
    async fetchUsers({ commit }) {
      try {
        const result = await axios.get(`${process.env.VUE_APP_API_URL}/person/all/json`)
        commit('SET_USERS', result.data)
      }
      catch(err) {
        console.log(err)
      }
    },
    async fetchUser({ commit }, id) {
      try {
        const result = await axios.get(`${process.env.VUE_APP_API_URL}/person/${id}/json`)
        commit("SET_USER", result.data)
      }
      catch(err) {
        console.log(err)
      }
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
    async updateProfile(context , payload) {
      try {
        await axios.patch(`${process.env.VUE_APP_API_URL}/${payload.userId}`, { username : payload.username })
        context.dispatch('fetchUser', payload.userId)
      }
      catch(err) {
        console.log(err)
      }
    },
    // User creates an event
    async addEvent(context, payload) {
      try {
        const result = await axios.post(`${process.env.VUE_APP_API_URL}/events`, { userId: payload.userId, formInfo: payload.formDetail })
        context.dispatch('fetchEvent', result.data._id)
        router.push('/user/profile') 
      }
      catch(err) {
        console.log(err)
      }
    },
    // User attends an event
    async attendEvent(context , payload) {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/person/register/${payload.eventId}`, { userId: payload.userId })
        context.dispatch('fetchUser', payload.userId)
        router.push('/user/profile')
      }
      catch(err) {
        console.log(err)
      }
    },
    // User updates an event
    async updateEvent(context , payload) {
      try {
        await axios.put(`${process.env.VUE_APP_API_URL}/events/${payload.eventId}`, payload.form)
        context.dispatch('fetchEvent', payload.eventId)
        router.push(`/${payload.eventId}/detail`) 
      }
      catch(err) {
        console.log(err)
      }
    },
    // User deletes an event
    async deleteEvent(context , id) {
      try {
        await axios.delete(`${process.env.VUE_APP_API_URL}/events/${id}`)
        router.push('/')
      }
      catch(err) {
        console.log(err)
      }
    },
    // User makes a comment 
    async makeComment(context, payload) {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/person/events/${payload.eventId}/comments`, { userId: payload.userId, comment: payload.commentDetail })
        context.dispatch('fetchEvent', payload.eventId)
      }
      catch(err) {
        console.log(err)
      }
    },
    // User connects with another user
    async connect(context, payload) {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/person/contacts/${payload.targetId}`, { userId: payload.userId })
        context.dispatch('fetchUser', payload.userId)
        router.push('/user/profile') 
      }
      catch(err) {
        console.log(err)
      }
    }    
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })]
})
