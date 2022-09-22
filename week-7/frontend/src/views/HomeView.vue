<template lang = 'pug'>
main
  div.container
    h1.title.is-3 EVENTS
    div.columns.is-multiline.is-mobile.is-centered
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