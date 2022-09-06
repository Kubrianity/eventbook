<template lang = 'pug'>
main
  h1 Your Profile Page
  h3 Hello, {{ user.username }}
  
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'UserProfile',
  computed: {
    ...mapState(['user'])
  },
  methods: {

  },
  created() {
  
  }
}
</script>