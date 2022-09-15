<template lang = 'pug'>
article.media
  figure.media-left
    p.image.is-64x64
      img(src="https://bulma.io/images/placeholders/128x128.png")
  div.media-content
    div.content
        strong {{ comment.author }}
        br  
        small {{ comment.createdAt }} 
        br 
        span {{ comment.comment }}
div.media-right
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'comment-card',
  props: ['comment'],
  computed: {
    ...mapState(['user', 'event'])
  },
  methods: {
    ...mapActions(['makeComment']),
    handleFormRegister() {
        const form = {
          commentDetail: {
            comment: this.comment,

          },
          eventId: this.event._id,
          userId: this.user._id
        }
        this.makeComment(form)
        console.log(form)
    }
  }
}
</script>

<style scoped>
article {
  margin: 0.75em;
}
</style>