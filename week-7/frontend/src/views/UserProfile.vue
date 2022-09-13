<template lang = 'pug'>
div.columns.is-mobile
  div.column
    div.box
      h3(v-if="!user.username") Hello, you are not logged in yet
      h3(v-else) Hello, {{ user.username }} 
        div(v-if="user.upcomingEvents && user.upcomingEvents.length > 0") Upcoming events
          li(v-for="event in user.upcomingEvents", :key="event._id") {{ event.name }}
            button.button.is-primary(@click.prevent = 'handleClick(event._id)' type="button" value="Delete") Delete
        span(v-else) You have no upcoming events yet

        div(v-if="user.createdEvents && user.createdEvents.length > 0") Organized events
          li(v-for="event in user.createdEvents", :key="event._id") {{ event.name }}
            button.button.is-primary(@click.prevent = 'handleClick(event._id)' type="button" value="Delete") Delete
        span(v-else) You have no organized events yet
      
        router-link.button.is-primary(to="/event-form") Create one
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserProfile',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['deleteEvent', 'fetchUser']),
    handleClick(id) {
      this.deleteEvent(id)
    }
  },
  mounted() {
    this.fetchUser(this.user._id)
  }
}
</script>