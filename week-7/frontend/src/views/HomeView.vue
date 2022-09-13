<template lang = 'pug'>
section.section
  div.container.has-text-centered
    h2.title Events
    div.tile.is-ancestor
      event-card(v-for = "event in events" :event="event")
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/event-card.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    EventCard
  },
  computed: {
    ...mapState(['events'])
  },
  methods: {
    ...mapActions(['fetchEvents'])
  },
  created() {
    this.fetchEvents()
  }
}
</script>