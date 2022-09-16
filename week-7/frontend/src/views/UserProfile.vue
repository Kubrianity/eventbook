<template lang = 'pug'>
h1.title.is-3(v-if="!user.username") You are not logged in yet

main(v-else)
  h1.title.is-3 Hello, {{ user.username }}
  section.section(v-if="user.upcomingEvents && user.upcomingEvents.length > 0") 
    div.container.has-text-centered
      h1.title.is-3 Upcoming Events
      div.tile.is-ancestor
        event-card(v-for = "event in user.upcomingEvents" :event="event")
  h1.title.is-3(v-else) You have no upcoming events yet

  section.section(v-if="user.createdEvents && user.createdEvents.length > 0") 
    div.container.has-text-centered
      h1.title.is-3 Organized Events
      div.tile.is-ancestor
        event-card(v-for = "event in user.createdEvents" :event="event") 
  h1.title.is-3(v-else) You have no organized events yet

  <router-link to="/event-form">Create one</router-link>
 
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import EventCard from '@/components/event-card.vue'

export default {
  name: 'UserProfile',
  components: {
    EventCard
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
  mounted() {
    this.fetchUser(this.user._id)
  }
}
</script>
