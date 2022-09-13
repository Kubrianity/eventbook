<template lang = 'pug'>
div.tile.is-parent
  article.tile.is-child.box
    p.title {{ event.name }} 
    figure.image
      img(src="https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")
    
    p.subtitle {{ event.place }}
    p.subtitle {{ event.date }}
    p.subtitle {{ event.attendees.length }} people are going to this event
    router-link.button.is-primary(v-bind:to="'/' + event._id + '/detail'") Detail
      
      
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'event-card',
  props: ['event'],
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['fetchEvent','attendEvent']),
    handleClick() {
      let attendanceInfo = {
        userId: this.user._id,
        eventId: this.event._id
      }
      this.attendEvent(attendanceInfo)
    }
  },
  created() {
    this.fetchEvent(this.event._id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>