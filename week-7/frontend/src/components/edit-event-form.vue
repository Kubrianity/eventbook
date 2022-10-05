<template lang = 'pug'>
div.hero.is-fullheight
  div.hero-body.is-justify-content-center.is-align-items-center
    div.box
      h1.title.is-3 Update an event
      form
        div.column
          label Name 
          input.input.is-rounded(type = "text" name = "name" v-model = "event.name") 
        div.column
          label Location
          input.input.is-rounded(type = "text" name = "place"  v-model = "event.place")
        div.column
          label Date 
          input.input.is-rounded(type = "date" :min = "minDate" name = "date" v-model = "event.date") 
        div.column
          button.button.is-primary.is-fullwidth(@click.prevent = "handleEventUpdate" type = "submit") Update
   
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'EditEventForm',
  data() {
    return {
      minDate: new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    ...mapState(['event'])
  },
  methods: {
    ...mapActions(['fetchEvent', 'updateEvent']),
    handleEventUpdate() {
        const data = {
            form: {
              name: this.event.name,
              place: this.event.place,
              date: new Date(this.event.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })
            },
            eventId: this.event._id
        }
        this.updateEvent(data)
    },
  created() {
    this.fetchEvent(this.$route.params.eventId)
  }
  }
}
</script>