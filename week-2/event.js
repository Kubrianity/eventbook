const Person = require('./person');

module.exports = class NewEvent {
    constructor(name, place, date, attendees = []) {
        this.name = name;
        this.place = place;
        this.date = date;
        this.attendees = attendees;
    }
    announce() {
        console.log(`${this.attendees.length} people are joining this event!`);
    }
    static create({name, place, date, attendees}) {
        const newevent = new NewEvent(name, place, date, attendees);
        if(newevent.attendees.length > 0) {
           newevent.attendees = attendees.map(Person.create);
        }
        return newevent;
    }
}