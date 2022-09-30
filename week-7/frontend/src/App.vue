<template lang = "pug">
nav.navbar.is-spaced.is-dark(role="navigation" aria-label="main navigation")
  div.navbar-brand
    a.navbar-burger(role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample")
      span(aria-hidden="true")
      span(aria-hidden="true")
      span(aria-hidden="true")

  div.navbar-menu(id="navbarBasicExample") 
    div.navbar-start
      router-link.navbar-item(to = "/") HOME
      router-link.navbar-item(to = "/user/profile" v-show="user.username") My Profile
      router-link.navbar-item(to = "/event-form" v-show="user.username") Create an event
    div.navbar-end
      div.navbar-item
        div.buttons
            button.button.is-primary(@click = "logOut" v-show = "isAuthenticated")
              strong Log out
            router-link.button.is-primary(to = "/register" v-show = "!isAuthenticated")
              strong Sign up
            router-link.button.is-light(to = "/login" v-show = "!isAuthenticated") Log in

router-view   

</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logOut']),
  },
  mounted() {
    // Toggle is-active class on touch devices
    const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'))
    navbarBurgers.forEach( element => {
      element.addEventListener('click', () => {
    
      const target = element.dataset.target;
      const targetEl = document.getElementById(target);

      element.classList.toggle('is-active');
      targetEl.classList.toggle('is-active');
      });
    });
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
.navbar-item {
  font-weight: 500;
}
</style>
