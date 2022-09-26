<template lang = 'pug'>
section.hero.is-fullheight
  div.hero-body.is-justify-content-center.is-align-items-center.has-text-centered
    div.box
      h1.title.is-3 Sign up
      form(@submit.prevent = "handleRegister")
        div.column
          label Username
          input.input.is-rounded(type = "text" name = "username" v-model = "username" required) 
        div.column
          label Password
          input.input.is-rounded(type = "password" name = "password"  v-model = "password" required)
        div.column
          button.button.is-primary.is-fullwidth(type = "submit") Sign up
        div.has-text-centered
          p.is-size-7 Already have an account?
          router-link.has-text-primary(to = "/login") Log in 
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

<style scoped>

</style>