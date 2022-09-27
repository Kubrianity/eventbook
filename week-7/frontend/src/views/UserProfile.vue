<template lang = 'pug'>
section.container
	div.columns.is-multiline
		div.column.is-3
			span.tag.is-rounded.is-link.is-large contacts
				div.media-right
					span.has-text-grey-light
						i.fa.fa-comments {{ getUserData.numberOfContacts }}
							
			span.tag.is-rounded.is-warning.is-large events
				div.media-right
					span.has-text-grey-light
						i.fa.fa-comments {{ getUserData.numberOfEvents }}
							
		div.column.is-9
			div.box.content
				article.post
					h3 Newsletter
					div.media
						div.media-content
							div.content
								p
									router-link(v-bind:to = "'/' + getUserData.recentEvent._id + '/detail'") {{ getUserData.recentEvent.name }} &nbsp;
									span.tag {{ getUserData.recentEvent.date }} 
								
				article.post
					h4 Last activities
					div.media
						div.media-content
							div.content
								p Your recent contact is: {{ getUserData.recentContact }}

		div.column.is-3
			span.tag.is-light.is-danger.is-large Edit profile
			
		div.column.is-9
			div.box.content
				label.label Change username
				input.input(type="text" name = "username" v-model = "username" :placeholder="user.username")
				button.button.is-light.is-danger(@click.prevent = 'handleProfileUpdate' type = "submit") Submit

</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import EventCard from '@/components/event-card.vue'

export default {
  name: 'UserProfile',
	data() {
		return {
			username: ''
		}
	},
  components: {
    EventCard
  },
  computed: {
    ...mapState(['user']),
		getUserData () {
			return {
				numberOfContacts: this.user.contacts.length,
				numberOfEvents: this.user.upcomingEvents.length + this.user.createdEvents.length,
				recentEvent: this.user.upcomingEvents[this.user.upcomingEvents.length - 1],
				recentContact: this.user.contacts[this.user.contacts.length - 1].username
			}
		}
	},
  methods: {
    ...mapActions(['fetchUser', 'updateProfile']),
		handleProfileUpdate() {
			const data = {
				username: this.username,
				userId: this.user._id
			}
		this.updateProfile(data)
		}
  },
  mounted() {
    this.fetchUser(this.user._id)
	}
}
</script>

<style scoped>
.tag.is-rounded, button {
  margin: 0.50em;
  width:7em;
}
article {
	margin: 0.50em;
}
h4 {
	margin: 1em;
}
</style>