<template lang = 'pug'>
div.columns.is-mobile
  div.column
    div.box
      form(@submit.prevent = "handleFormRegister")
        div 
          label Choose a name
          input(type="text" name="name" v-model="name") 
        div
          label Choose a place 
          input(type="text" name="place" v-model="place")  
        div
          label Choose a date
          input(type="text" name="date" v-model="date")   
        div  
          button(type="submit" value="Create") Create
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