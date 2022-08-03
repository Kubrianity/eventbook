const Review = require('./review');

module.exports = class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.contacts = [];
    }
    signup(upcomingEvent) {
        this.upcomingEvent = upcomingEvent;
        upcomingEvent.attendees.push(this.name);
    }
    connect(person) {
        console.log(`Other ${this.upcomingEvent.attendees.length - 1} people are interested in this event, too! Connect with them!`);
        this.contacts.push({contactName : person.name, contactInfo : person.email});
        person.contacts.push({contactName : this.name, contactInfo : this.email})
    }
    makeComment(comment , ratings) {
        let review = new Review(comment, ratings);
        review.name = this.name;
        this.reviews = review;
        console.log(`You commented : '${review.comment}'. You gave ${review.rating} stars for this event!`);
    }
}