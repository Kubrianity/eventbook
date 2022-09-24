<template lang = 'pug'>
section.columns.body-columns
  div.column.is-two-fifths.is-offset-one-quarter
    div.card
      div.header
        div.media
          div.media-content
            p.title.is-4 {{ event.name }}  
            p.subtitle.is-4 {{ event.date }}
            p.subtitle.is-4 {{ event.place }}
                   
      div.card-image
        figure.image.is-4by3
          img(src="https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Placeholder image")
      div.card-content
        div.level.is-mobile
          div.level-left
            div.level-item.has-text-centered
        div.content
          button.button.is-primary(v-if="user.username && checkAttendStatus()" @click.prevent = 'handleClick' type="button" value="Attend") Attend
          router-link.has-text-primary(v-else-if="!user.username" to="/login") Log in to attend this event
          button.button.is-primary(v-if="user.username && checkDeleteUpdateStatus()" @click.prevent = 'handleDelete' type="button" value="Delete") Delete
          router-link.button.is-primary(v-if="user.username && checkDeleteUpdateStatus()" v-bind:to="'/' + event._id + '/edit'") Update
  section
    comment-card(v-for = "comment in event.comments" :comment="comment")
    article.media
      div.media-content
        div.field
          p.control
            textarea.textarea(v-model="comment" name="comment" placeholder="Add a comment..." rows="3" :disabled="!user.username")
        nav.level
          div.level-left
            div.level-item
              input.button.is-info(@click.prevent = 'handleFormRegister' type="button" value="Submit" :disabled="!user.username")
                                
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CommentCard from './comment-form.vue'

export default {
  name: 'event-card',
  data() {
    return {
        comment: '',
    }
  },
  components: {
    CommentCard
  },
  computed: {
    ...mapState(['event','user'])
  },
  methods: {
    ...mapActions(['fetchEvent','attendEvent', 'makeComment', 'deleteEvent']),
    handleClick() {
      let attendanceInfo = {
        userId: this.user._id,
        eventId: this.event._id
      }
      this.attendEvent(attendanceInfo)
    },
    handleFormRegister() {
        const form = {
          commentDetail: {
            comment: this.comment,

          },
          eventId: this.event._id,
          userId: this.user._id
        }
        this.makeComment(form)
        this.comment = ''
    },
    checkDeleteUpdateStatus() {
      return this.user.createdEvents.some(event => event._id == this.event._id)
    },
    checkAttendStatus() {
      return !(this.event.attendees.some(user => user._id == this.user._id))
    },
    handleDelete() {
      this.deleteEvent(this.event._id)
    }
  },
  created() {
    this.fetchEvent(this.$route.params.eventId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin: 0.5em;
}
section, button, input, .button {
  margin: 0.75em;
}

</style>