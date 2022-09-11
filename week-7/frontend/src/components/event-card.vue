<template lang = 'pug'>
div.columns.is-mobile
  div.column
    div.box
      p {{ event.name }} 
      p {{ event.place }}
      p {{ event.date }}
      p {{ event.attendees.length }} people are going to this event
      button.button.is-primary(@click.prevent = 'handleClick' type="button" value="Attend") Attend
      div(v-if="event.comments && event.comments.length > 0") Comments
        p(v-for="comment in event.comments", :key="comment._id") {{ comment.author}} wrote: {{ comment.comment }} on {{ comment.createdAt }}

      <router-link v-bind:to="'/' + event._id + '/comment-form'">Make a comment</router-link>
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