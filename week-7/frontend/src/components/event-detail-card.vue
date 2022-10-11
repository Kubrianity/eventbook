<template lang = 'pug'>
main.columns.is-centered.is-multiline(:class = "{ disabled: !isActive || isDeleted }")
  section.column.is-three-fifths-tablet.is-two-fifths-desktop
    div.card
      div.header
        div.media
          div.media-content
            p.title.is-4 {{ event.name }}  
            p.subtitle.is-4 {{ formatedDate }}
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
          router-link.has-text-info(v-else-if = "!isAuthenticated" to="/login") Log in to attend this event
          button.button.is-warning(v-if = "checkDeleteUpdateStatus()" @click.prevent = 'handleDelete' type = "button" value = "Delete") Delete
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
        
loading(v-model:active = "isLoading" loader = "dots")                               
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CommentCard from './comment-card.vue'
import AttendeeCard from './attendee-card.vue'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'event-card',
  data() {
    return {
        comment: '',
        isLoading: false
    }
  },
  components: {
    CommentCard,
    AttendeeCard,
    Loading
  },
  computed: {
    ...mapState(['event','user']),
    ...mapGetters(['isAuthenticated']),
    isActive() {
      return this.event.isActive
    },
    isDeleted() {
      return this.event.isDeleted
    },
    formatedDate() {
      return new Date(this.event.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })
    }
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
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.deleteEvent(this.event._id)
      }, 1000)
    }
  },
  created() {
    this.fetchEvent(this.$route.params.eventId)
  }
}
</script>

<style scoped>
main {
  margin-top: 4em;
}
p, h {
  margin: 0.5em;
}
button, input, .button {
  margin: 0.75em;
}
section {
  margin: 1em;
}
.disabled {
  opacity: 0.50;
  pointer-events: none
}
</style>