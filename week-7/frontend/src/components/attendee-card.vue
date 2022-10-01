<template lang = 'pug'>
article.media
  div.media-content
    div.content
      p
        strong(v-if = "user._id == attendee._id") You
        strong(v-else) {{ attendee.username }}
        br  
        small member since
        br
        small {{ attendeeCreatedAt }}
        br
        button.button.is-primary(v-show = "checkConnectStatus()" @click.prevent = "handleConnect") Connect
        router-link.has-text-info(v-show = "!(user._id)" to = "/login") Log in to connect

</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex'

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
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
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
      return this.isAuthenticated 
        && (this.user._id != this.attendee._id)
        && !(this.user.contacts.some(contact => contact._id == this.attendee._id))
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
  padding:0.30em;
}
</style>