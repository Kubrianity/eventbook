<template lang = 'pug'>
main.columns.is-centered.is-multiline
  section.column.is-three-fifths-tablet.is-two-fifths-desktop
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
          button.button.is-primary(v-if = "checkAttendStatus()" @click.prevent = 'handleAttend' type = "button" value = "Attend") Attend
          router-link.has-text-primary(v-else-if = "!isAuthenticated" to="/login") Log in to attend this event
          button.button.is-primary(v-if = "checkDeleteUpdateStatus()" @click.prevent = 'handleDelete' type = "button" value = "Delete") Delete
          router-link.button.is-primary(v-if = "checkDeleteUpdateStatus()" v-bind:to = "'/' + event._id + '/edit'") Update

  section.column.is-three-fifths-tablet.is-one-fifth-desktop
    h4.title.is-4 Attendees
    attendee-card(v-for = "attendee in event.attendees" :attendee="attendee")

  section.box.column.is-three-fifths-tablet.is-two-fifths-desktop
    h3.title.is-4 Comments
    comment-card(v-for = "comment in event.comments" :comment="comment")
    router-link.has-text-info(v-if = "!isAuthenticated" to="/login") Log in to make a comment
    div.field(v-else)
      p.control
        textarea.textarea(v-model="comment" name="comment" placeholder="Add a comment..." rows="3" required)
      div.level-item
        input.button.is-info(@click.prevent = 'handleComment' type="button" value="Submit")
                                
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CommentCard from './comment-card.vue'
import AttendeeCard from './attendee-card.vue'
export default {
  name: 'event-card',
  data() {
    return {
        comment: '',
    }
  },
  components: {
    CommentCard,
    AttendeeCard
  },
  computed: {
    ...mapState(['event','user']),
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['fetchEvent','attendEvent', 'makeComment', 'deleteEvent']),
    handleAttend() {
      let attendanceInfo = {
        userId: this.user._id,
        eventId: this.event._id
      }
      this.attendEvent(attendanceInfo)
    },
    handleComment() {
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
    // Check if the user created this event 
    checkDeleteUpdateStatus() {
      return this.isAuthenticated && this.user.createdEvents.some(event => event._id == this.event._id)
    },
    // Check if the user is already an attendee
    checkAttendStatus() {
      return this.isAuthenticated && !(this.event.attendees.some(user => user._id == this.user._id))
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
p, h {
  margin: 0.5em;
}
button, input, .button {
  margin: 0.75em;
}
section {
  margin: 1em;
}
</style>