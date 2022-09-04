<template lang = 'pug'>
div.name {{ event.name }} {{ event.place }} {{ event.date }}
</template>

<script>
export default {
  name: 'event-card',
  props: ['event']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name {
  color: blue
}
</style>
