module.exports = class NewEvent {
    constructor(name, place, date) {
        this.name = name;
        this.place = place;
        this.date = date;
        this.attendees = [];
    }
    announce() {
        console.log(`${this.attendees.length} people are joining this event!`);
    }
}