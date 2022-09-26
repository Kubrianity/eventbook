<template lang = 'pug'>
article.media(v-show = "user._id != attendee._id")
  div.media-left
    figure.image.is-64x64
      img.is-rounded(src="https://bulma.io/images/placeholders/128x128.png")
  div.media-content
    div.content.level-left
      p
        strong {{ attendee.username }}
        br  
        small member since
        br
        small {{ attendeeCreatedAt }}
        br
        button.button.is-primary(v-show = "checkConnectStatus()" @click.prevent = "handleConnect") Connect
        router-link.has-text-info(v-show = "!(user._id)" to = "/login") Log in to connect

</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'attendee-card',
  props: ['attendee'],
  data() {
    // Converts date to readable format
    return {
      attendeeCreatedAt: new Date(this.attendee.createdAt).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['connect']),
    handleConnect() {
        const data = {
            targetId: this.attendee._id,
            userId: this.user._id
        }
        this.connect(data) 
    },
    // Check if the attendee is already in the user's contact list
    checkConnectStatus() {
      return this.user._id && !(this.user.contacts.some(contact => contact._id == this.attendee._id))
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
button {
  border-radius: 8px;
  margin: 0.25em;
  padding:0.50em;
}
</style>