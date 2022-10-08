<template lang = 'pug'>
div.hero.is-fullheight
  div.hero-body.is-justify-content-center.is-align-items-center
    div.box
      h1.title.is-3 Submit an event
      form(@submit.prevent = "handleFormRegister")
        div.column
          label Name
          input.input.is-rounded(type = "text" name = "name" v-model = "name" required) 
        div.column
          label Location
          input.input.is-rounded(type = "text" name = "place"  v-model = "place" required)
        div.column
          label Date 
          input.input.is-rounded(type = "date" :min = "minDate()" name = "date"  v-model = "date" required) 
        div.column
          button.button.is-primary.is-fullwidth(type = "submit") Submit
   
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'EventForm',
  data() {
    return {
      name: '',
      place: '',
      date: '',
      minDate() {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
      }
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
