<template lang = 'pug'>
div.columns.is-mobile
  div.column
    div.box
      form(@submit.prevent = "handleFormRegister")
        div 
          label Enter a comment
          input(type="text" name="comment" v-model="comment" placeholder="Write your comment here") 
 
        div  
          button(type="submit" value="Submit") Submit
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'CommentForm',
  data() {
    return {
        id: this.$route.params.eventId,
        comment: '',
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['makeComment']),
    handleFormRegister() {
        const form = {
          commentDetail: {
            comment: this.comment,

          },
          eventId: this.id,
          userId: this.user._id
        }
        this.makeComment(form)
        console.log(form)
    }
  }
}
</script>