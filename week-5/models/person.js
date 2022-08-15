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

PersonSchema.plugin(require('mongoose-autopopulate'))
const PersonModel = mongoose.model('Person', PersonSchema)

module.exports = PersonModel
