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







// const Review = require('./review');
// const Event = require('./event')

// module.exports = class Person {
//     constructor(name, email, id, contacts = [], events = []) {
//         this.name = name;
//         this.email = email;
//         this.id = id;
//         this.contacts = contacts;
//         this.events = events;
//     }
//     createEvent(name, place, date) {
//         let event = new Event(name, place, date)
//     }
//     signup(upcomingEvent) {
//         this.events.push(upcomingEvent.name);
//         upcomingEvent.attendees.push(this);
//     }
//     connect(person) {
//         this.contacts.push({contactName : person.name, contactInfo : person.email});
//         person.contacts.push({contactName : this.name, contactInfo : this.email})
//     }
//     makeComment(comment , ratings) {
//         let review = new Review(comment, ratings);
//         review.name = this.name;
//         this.reviews = review;
//         console.log(`You commented : '${review.comment}'. You gave ${review.rating} stars for this event!`);
//         return review;
//     }
//     static create({name, email, id, contacts, events}) {
//         return new Person(name, email, id, contacts, events);
//     }
// }