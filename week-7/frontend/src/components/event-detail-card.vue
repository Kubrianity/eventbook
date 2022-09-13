<template lang = 'pug'>
div.columns.is-mobile
  div.column
    div.box
      p Name: {{ event.name }} 
      p Location: {{ event.place }}
      p Date: {{ event.date }}
      
      button.button.is-primary(@click.prevent = 'handleClick' type="button" value="Attend") Attend
      router-link.button.is-primary(v-bind:to="'/' + event._id + '/comment-form'") Make a comment
      div(v-if="event.comments && event.comments.length > 0") Comments
        p(v-for="comment in event.comments", :key="comment._id") {{ comment.author}} wrote: {{ comment.comment }} on {{ comment.createdAt }}
      
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'event-card',
  computed: {
    ...mapState(['event','user'])
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
  mounted() {
    this.fetchEvent(this.$route.params.eventId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  max-width:auto;
  margin:15px;
}
.button {
  margin:15px;
}
p {
  margin:5px;
}
</style>