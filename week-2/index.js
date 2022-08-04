const Person = require('./person');
const NewEvent = require('./event');
const Databese = require('./databese')

const kubra = new Person('Kubra', 'example@email.com');
const kevser = new Person('Kevser', 'example2@email.com');
const mark = new Person('Mark', 'example3@email.com');

const upcomingEvent = new NewEvent('Rock Festival', 'Ankara', '01-01-2023  04-01-2023');

kubra.signup(upcomingEvent);
kevser.signup(upcomingEvent);
mark.signup(upcomingEvent);

kubra.connect(kevser);
kubra.connect(mark);
kevser.connect(mark);

kubra.makeComment('Yay! I am so excited to see this', 5);

Databese.save(upcomingEvent)


