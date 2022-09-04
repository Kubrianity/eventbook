<template lang = 'pug'>
main
  h1 Main Page
  div {{ events }}
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
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
