<template lang = 'pug'>
div.columns.is-mobile
  div.column
    div.box
      form(@submit.prevent = "handleRegister")
        div 
          label Choose a username
          input(type="text" name="username" v-model="username") 
        div
          label Choose a password 
          input(type="password" name="password" v-model="password")  
        div  
          button(type="submit" value="Register") Register
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
        username: '',
        password: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['register']),
    handleRegister() {
      let userInfo = {
        username: this.username,
        password: this.password
      }
      this.register(userInfo)
    }
  }
}
</script>