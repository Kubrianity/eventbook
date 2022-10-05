<template lang = 'pug'>
section.container
	h1.title.is-3 Welcome, {{ user.username }}
	div.columns.is-multiline.is-centered
		div.column.is-9
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
					h4.title.is-4 Events
					div.media
						div.media-content
							div.content
								p(v-if = "!(getUserData.numberOfEvents)") You don't have any events yet!
								p(v-show = "getUserData.upcomingEvents" v-for = "event in getUserData.upcomingEvents") 
									router-link(v-bind:to = "'/' + event._id + '/detail'") {{ event.name }} &nbsp;
									span.tag {{ event.date }} 	
								p(v-show = "getUserData.createdEvents" v-for = "event in getUserData.createdEvents")
									router-link(v-bind:to = "'/' + event._id + '/detail'") {{ event.name }} &nbsp;
									span.tag {{ event.date }} 
								
				article.post
					h4.title.is-4 Contacts
					div.media
						div.media-content
							div.content
								p(v-if = "!(getUserData.numberOfContacts)") You don't have any contacts yet!
								p.contacts(v-else v-for = "contact in getUserData.contacts") {{ contact.username }}
							  		
		div.column.is-6.edit
			span.tag.is-light.is-danger.is-large.edit-heading Edit profile
			div.box.content
				label.label Change username
				input.input(type="text" name = "username" v-model = "username" :placeholder="user.username" required)
				button.button.is-rounded.is-light.is-danger(@click.prevent = 'handleProfileUpdate' type = "submit") Submit						 		
								
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
				upcomingEvents: this.user.upcomingEvents.length ? this.user.upcomingEvents : null,
				createdEvents: this.user.createdEvents.length ? this.user.createdEvents : null,
				contacts: this.user.contacts.length ? this.user.contacts : null
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
section.container {
	margin-top: 4em;
}
.tag.is-rounded, button {
  margin: 0.50em;
  width: 7em;
}
article {
	margin: 0.50em;
}
h4 {
	margin: 1em;
}
.edit-heading {
	margin: 1em;
}
.edit {
	margin: 2.5em;
}
</style>