<template lang = 'pug'>
div.hero.is-fullheight
  h2 Submit your event here
    div.hero-body.is-justify-content-center.is-align-items-center
      div.columns.is-flex.is-flex-direction-column.box
        form(@submit.prevent = "handleFormRegister")
          div.column
            label Choose a name
            input.input.is-primary(type="text" name="name" v-model="name") 
          div.column
            label Choose a location
            input.input.is-primary(type="text" name="place"  v-model="place")
          div.column
            label Choose a date 
            input.input.is-primary(type="date" name="date"  v-model="date") 
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
