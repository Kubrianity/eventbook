<template lang = 'pug'>
main
  div.container.has-text-centered
    h1.title.is-3 EVENTS
    div.columns.is-multiline.is-centered(v-show = "events.length")
      event-card(v-for = "event in sortedEvents()" :event="event")
loading(v-model:active = "isLoading" loader = "dots")  
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/event-card.vue'
import { mapState, mapActions } from 'vuex'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'HomeView',
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    EventCard,
    Loading
  },
  computed: {
    ...mapState(['events'])
  },
  methods: {
    ...mapActions(['fetchEvents']),
    sortedEvents() { // Sort events by deleted and active status
      return [...this.events].sort((a, b) => Number(a.isDeleted) - Number(b.isDeleted) || Number(b.isActive) - Number(a.isActive))
    }
  },
  created() {
    // Display loader while events being fetched
    this.isLoading = true
    this.fetchEvents()
    .then(() => {
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
  div.container {
    margin-top: 5em;
  }
</style>