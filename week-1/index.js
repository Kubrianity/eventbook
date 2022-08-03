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
        this.contacts.push(person);
    }
    comment(text , ratings) {
        let comment = new Comment(text, ratings);
        comment.name = this.name;
        this.comment = comment;
        console.log(`You commented : '${comment.text}'. You gave ${comment.rating} stars for this event!`);
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

class Comment {
    constructor(text, rating) {
        this.text = text;
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

kubra.comment('Yay! am so excited to see this', 5);

console.log(`Kubra, you have ${kubra.contacts.length} contacts!`);

upcomingEvent.news();






