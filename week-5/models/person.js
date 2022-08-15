const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    upcomingEvents: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
        autopopulate: {
            maxDepth: 1
        }
    }],
    createdEvents: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
        autopopulate: {
            maxDepth: 1
        }
    }],
    contacts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Person',
        autopopulate: {
            maxDepth: 1
        }
    }],
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
        autopopulate: {
            maxDepth: 1
        }
    }]
})

// Create an event
PersonSchema.methods.create = async function(event) {
    this.createdEvents.push(event)
    event.organizers.push(this)
    await this.save()
    await event.save()
}

// Register for an event
PersonSchema.methods.register = async function(event) {
    this.upcomingEvents.push(event)
    event.attendees.push(this)
    await this.save()
    await event.save()
}

PersonSchema.plugin(require('mongoose-autopopulate'))
const PersonModel = mongoose.model('Person', PersonSchema)

module.exports = PersonModel
