<template lang = 'pug'>
main
  h1 Main Page
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