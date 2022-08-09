const Person = require('./person');

module.exports = class EventModel {
    constructor(name, place, date, attendees = [], id) {
        this.name = name;
        this.place = place;
        this.date = date;
        this.attendees = attendees;
        this.id = id;
    }
    announce() {
        console.log(`${this.attendees.length} people are joining this event!`);
    }
    static create({name, place, date, attendees, id}) {
        const newevent = new EventModel(name, place, date, attendees, id);
        newevent.attendees = attendees.map(Person.create);
        return newevent;
    }
}