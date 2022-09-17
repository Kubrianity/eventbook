<template lang = 'pug'>
article.media
  div.media-left
    figure.image.is-64x64
      img.is-rounded(src="https://bulma.io/images/placeholders/128x128.png")
  div.media-content
    div.content
      p
        strong {{ comment.author }}
        br  
        small {{ comment.createdAt }} 
        br 
        span {{ comment.comment }}

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
div.content {
  word-wrap:break-word;
  word-break: break-all;
}
</style>