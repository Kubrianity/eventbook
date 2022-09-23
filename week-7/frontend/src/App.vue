<template lang = "pug">
nav.navbar.is-spaced.is-dark(role="navigation" aria-label="main navigation")
  div.navbar-menu(id="navbarExampleTransparentExample")
    div.navbar-start
      router-link.navbar-item(to="/") HOME
      router-link.navbar-item(to="/user/profile" v-show="user.username") My Profile
      router-link.navbar-item(to="/event-form" v-show="user.username") Create an event
    div.navbar-end
      div.navbar-item
        div.buttons
            button.button.is-primary(@click="logOut" v-show="user.username")
              strong Log out
            router-link.button.is-primary(to="/register" v-show="!user.username")
              strong Sign up
            router-link.button.is-light(to="/login" v-show="!user.username") Log in
<router-view/>            

</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logOut'])
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   text-align: center;
}
nav {
  margin-bottom:4em;
}
</style>
