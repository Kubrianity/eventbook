class Person {
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

class newEvent {
    constructor(name, place, date) {
        this.name = name;
        this.place = place;
        this.date = date;
        this.attendees = [];
    }
    news() {
        console.log(`${this.attendees.length} people are joining this event!`);
    }
}

class Review {
    constructor(comment, rating) {
        this.comment = comment;
        this.rating = rating;
    }
}

const kubra = new Person('Kubra', 'example@email.com');
const kevser = new Person('Kevser', 'example2@email.com');
const mark = new Person('Mark', 'example3@email.com');

const upcomingEvent = new newEvent('Rock Festival', 'Ankara', '01-01-2023  04-01-2023');

kubra.signup(upcomingEvent);
kevser.signup(upcomingEvent);
mark.signup(upcomingEvent);

kubra.connect(kevser);
kubra.connect(mark);
kevser.connect(mark);

kubra.makeComment('Yay! I am so excited to see this', 5);

console.log(kubra.reviews)










