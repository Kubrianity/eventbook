<template lang = 'pug'>
div.columns.is-mobile
  div.column
    div.box
      p {{ event.name }}
      p {{ event.place }}
      p {{ event.date }}
      p {{ event.attendees.length }} people are going to this event
</template>

<script>
export default {
  name: 'event-card',
  props: ['event']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  max-width:auto;
  margin:15px;
}
button {
  margin:15px;
}
p {
  margin:5px;
}
</style>