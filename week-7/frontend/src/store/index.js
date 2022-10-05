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
    async register({commit}, user) {
      try {
        const result = await axios.post(`http://localhost:3000/auth/register`, user, { withCredentials: true, origin: 'http://localhost:8080'})
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
        const result = await axios.post(`http://localhost:3000/auth/login`, user, { withCredentials: true, origin: 'http://localhost:8080'})
        commit('SET_USER', result.data)
        router.push('/user/profile')
      }
      catch(err) {
        console.log(err)
        return
      }
    },
    async logOut({commit}) {
      await axios.post(`http://localhost:3000/auth/logout`)
        .then(() => sessionStorage.clear())
        .catch(err => console.log(err))
      commit('SET_USER', {})
      router.push('/')
    },
    // User updates profile
    async updateProfile(context , payload) {
      await axios.patch(`http://localhost:3000/person/${payload.userId}`, { username : payload.username })
        .then(() => context.dispatch('fetchUser', payload.userId))
        .catch(err => console.log(err))
      },
    // User creates an event
    async addEvent(context, payload) {
      await axios.post("http://localhost:3000/events", { userId: payload.userId, formInfo: payload.formDetail })
        .then((result) => context.dispatch('fetchEvent', result.data._id))
        .catch(err => console.log(err))
      router.push('/user/profile')  
    },
    // User attends an event
    async attendEvent(context , payload) {
      await axios.post(`http://localhost:3000/person/register/${payload.eventId}`, { userId: payload.userId })
        .then(() => context.dispatch('fetchUser', payload.userId))
        .catch(err => console.log(err))
      router.push('/user/profile')
    },
    // User updates an event
    async updateEvent(context , payload) {
      await axios.put(`http://localhost:3000/events/${payload.eventId}`, payload.form)
        .then(() => context.dispatch('fetchEvent', payload.eventId))
        .catch(err => console.log(err))
      router.push(`/${payload.eventId}/detail`)  
        },
    // User deletes an event
    async deleteEvent(context , id) {
      const userId = this.state.user._id
      await axios.delete(`http://localhost:3000/events/${id}`)
        .then(() => context.dispatch('fetchUser', userId))
        .catch(err => console.log(err))
      router.push('/')  
    },
    // User makes a comment 
    async makeComment(context, payload) {
      await axios.post(`http://localhost:3000/person/events/${payload.eventId}/comments`, { userId: payload.userId, comment: payload.commentDetail })
        .then(() => context.dispatch('fetchEvent', payload.eventId))
        .catch(err => console.log(err))
    },
    // User connects with another user
    async connect(context, payload) {
      await axios.post(`http://localhost:3000/person/contacts/${payload.targetId}`, { userId: payload.userId })
        .then(() => context.dispatch('fetchUser', payload.userId))
        .catch(err => console.log(err))
      router.push('/user/profile')  
    }    
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })]
})
