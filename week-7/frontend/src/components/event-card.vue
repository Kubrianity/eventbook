<template lang = 'pug'>
div.column.is-two-thirds-tablet.is-half-desktop.is-one-third-widescreen
  div.box.has-text-centered(:class = "{disabled: !isActive}")
    p.title.is-4 {{ event.name }}
    p.subtitle {{ event.place }}
    p.subtitle {{ event.date }} 
    figure.image.is-4by3
      img(src="https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")
    p.subtitle(v-if = "event.attendees.length > 1") {{ event.attendees.length }} attendees
    p.subtitle(v-else) {{ event.attendees.length }} attendee  
    router-link.button.is-primary(v-bind:to = "'/' + event._id + '/detail'") Detail
      
      
</template>

<script>
export default {
  name: 'event-card',
  props: ['event'],
  computed: {
    isActive() {
      return this.event.isActive
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin:0.50em;
}
.disabled {
  opacity: 0.50;
  pointer-events: none
}
</style>