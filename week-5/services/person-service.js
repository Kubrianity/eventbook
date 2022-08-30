const BaseService = require('./base-service');
const PersonModel = require('../models/person');

class PersonService extends BaseService {
    model = PersonModel
    
    async create(person, event) {
        person.createdEvents.push(event)
        event.organizers.push(person)
        await person.save()
        await event.save()
    }

    async register(person, event) {
        person.upcomingEvents.push(event)
        event.attendees.push(person)
        await person.save()
        await event.save()
    }

    async connect(person, personToConnect) {
        person.contacts.push(personToConnect)
        personToConnect.contacts.push(person)
        await person.save()
        await personToConnect.save()
    }

    async makeComment(person, comment, event) {
        person.comments.push(comment)
        comment.author = person.username
        event.comments.push(comment)
        await person.save()
        await comment.save()
        await event.save()
    }
}

module.exports = new PersonService();