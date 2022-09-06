<template lang = 'pug'>
div.columns.is-mobile
  div.column
    div.box
      form(@submit.prevent = "handleClick")
        div 
          label Username
          input(type="text" name="username" v-model="username") 
        div
          label Password 
          input(type="password" name="password" v-model="password")  
        div  
          button(type="submit" value="Log in") Login  
        
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  max-width:auto;
  margin:15px;
}
button {
  margin:15px;
}
p {
  margin:5px;
}
</style>