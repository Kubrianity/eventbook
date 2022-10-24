<template lang = 'pug'>
main
  div.container.has-text-centered
    h1.title.is-3 EVENTS
    div.columns.is-multiline.is-centered(v-show = "events.length")
      event-card(v-for = "event in events" :event="event")
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
  components: {
    EventCard,
    Loading
  },
  computed: {
    ...mapState(['events']),
    // Display loader while events being fetched
    isLoading() {
      return this.events.length ? false : true
    }
  },
  methods: {
    ...mapActions(['fetchEvents'])
  },
  created() {
    this.fetchEvents()
  }
}
</script>

<style scoped>
  div.container {
    margin-top: 5em;
  }
</style>