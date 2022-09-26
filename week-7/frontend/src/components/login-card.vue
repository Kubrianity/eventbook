<template lang = 'pug'>
section.hero.is-fullheight
  div.hero-body.is-justify-content-center.is-align-items-center
    div.box
      h1.title.is-3 Login
      form(@submit.prevent = "handleLogin")
        div.column
          label Username
          input.input.is-rounded(type = "text" name = "username" v-model = "username") 
        div.column
          label Password
          input.input.is-rounded(type = "password" name = "password"  v-model = "password")
        div.column
          button.button.is-primary.is-fullwidth(type = "submit") Log in
        div.has-text-centered
          p.is-size-7 Don't have an account?
          router-link.has-text-primary(to = "/register") Sign up
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
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
    ...mapActions(['logIn']),
    handleLogin() {
      let userInfo = {
        username: this.username,
        password: this.password
      }
      this.logIn(userInfo)
    }
  }
}
</script>

<style scoped>

</style>