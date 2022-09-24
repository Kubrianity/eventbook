<template lang = 'pug'>
div.hero.is-fullheight
  div.hero-body.is-justify-content-center.is-align-items-center
    div.box
      h1.title.is-3 Update an event
      form(@submit.prevent = "handleFormRegister")
        div.column
          label Name 
          input.input.is-rounded(type="text" name="name" v-model="name" :placeholder = "event.name") 
        div.column
          label Location
          input.input.is-rounded(type="text" name="place"  v-model="place" :placeholder = "event.place")
        div.column
          label Date 
          input.input.is-rounded(type="date" :min="minDate" name="date" v-model="date") 
        div.column
          button.button.is-primary.is-fullwidth(@click.prevent="handleFormUpdate" type="submit") Update
   
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'EditEventForm',
  data() {
    return {
        name: '',
        place: '',
        date:'',
        minDate: new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    ...mapState(['event'])
  },
  methods: {
    ...mapActions(['fetchEvent', 'updateEvent']),
    handleFormUpdate() {
        const data = {
            form: {
              name: this.name,
              place: this.place,
              date: new Date(this.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })
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