<template lang = 'pug'>
h1.title.is-3(v-if="!user.username") You are not logged in yet

div.hero.is-fullheight(v-else)
  div.hero-body.is-justify-content-center.is-align-items-center
    div.box
      h1.title.is-3 Submit an event
      form(@submit.prevent = "handleFormRegister")
        div.column
          label Choose a name
          input.input.is-rounded(type="text" name="name" v-model="name" required) 
        div.column
          label Choose a location
          input.input.is-rounded(type="text" name="place"  v-model="place" required)
        div.column
          label Choose a date 
          input.input.is-rounded(type="date" name="date"  v-model="date" required) 
        div.column
          button.button.is-primary.is-fullwidth(type="submit") Submit
   
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'EventForm',
  data() {
    return {
        name: '',
        place: '',
        date:''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['addEvent']),
    handleFormRegister() {
        const form = {
          formDetail: {
            name: this.name,
            place: this.place,
            date: this.date
          },
          userId: this.user._id
        }
        this.addEvent(form)
    }
  }
}
</script>
