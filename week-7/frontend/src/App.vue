<template lang = "pug">
nav.navbar.is-spaced.is-dark(role="navigation" aria-label="main navigation")
  div.navbar-menu(id="navbarExampleTransparentExample")
    div.navbar-start
      router-link.navbar-item(to="/") HOME
      router-link.navbar-item(to="/user/profile") My Profile
      router-link.navbar-item(to="/event-form") Create an event
    div.navbar-end
      div.navbar-item
        div.buttons
            router-link.button.is-primary(to="/register")
              strong Sign up
            router-link.button.is-light(to="/login") Log in
<router-view/>            

</template>

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
