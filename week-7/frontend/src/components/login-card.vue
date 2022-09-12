<template lang = 'pug'>
div.hero.is-fullheight
  div.hero-body.is-justify-content-center.is-align-items-center
    div.columns.is-flex.is-flex-direction-column.box
      form(@submit.prevent = "handleClick")
        div.column
          label Username
          input.input.is-primary(type="text" name="username" v-model="username") 
        div.column
          label Password
          input.input.is-primary(type="password" name="password"  v-model="password")
        div.column
          button.button.is-primary.is-fullwidth(type="submit") Log in
        div.has-text-centered
          p.is-size-7 Don't have an account?
          router-link.has-text-primary(to="/register") Sign up
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
    handleClick() {
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
  label {
    font-family: 'Courier New', monospace;
  }
</style>