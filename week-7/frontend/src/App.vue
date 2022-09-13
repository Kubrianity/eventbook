<template lang = "pug">
nav.navbar.is-dark(role="navigation" aria-label="main navigation")
  div.navbar-menu(id="navbarExampleTransparentExample")
    div.navbar-start
      a.navbar-item EVENTBOOK
      router-link.navbar-item(to="/") Home
      router-link.navbar-item(to="/user/profile") My Profile
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
</style>
