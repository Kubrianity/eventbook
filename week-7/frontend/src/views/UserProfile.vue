<template lang = 'pug'>
div.columns.is-mobile
  div.column
    div.box
      h3 Hello, {{ user.username }} 
      div(v-if="user.upcomingEvents && user.upcomingEvents.length > 0")
        li(v-for="event in user.upcomingEvents", :key="event.name") {{ event.name }}
      span(v-else) You have no upcoming events yet

      div(v-if="user.createdEvents && user.createdEvents.length > 0")
        li(v-for="event in user.createdEvents", :key="event.name") {{ event.name }} 
      span(v-else) You have no organized events yet
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