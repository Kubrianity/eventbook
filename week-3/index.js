const Person = require('./models/person')
const EventModel = require('./models/event')
const PersonService = require('./services/person-service')
const EventService = require('./services/event-service')

async function main() {

  const kubra = new Person('Kubra', 'example@email.com')
  const kevser = new Person('Kevser', 'example2@email.com')
  const mark = new Person('Mark', 'example3@email.com');
  
  const upcomingEvent = new EventModel('Rock Festival', 'Ankara', '01-01-2023  04-01-2023');

  mark.signup(upcomingEvent);
  kubra.signup(upcomingEvent);
  kevser.signup(upcomingEvent);
    
  kubra.connect(kevser);
  kubra.connect(mark);
  kevser.connect(mark);

  await PersonService.add(mark);
  await PersonService.add(kubra);
  await PersonService.add(kevser);
  
  const people = await PersonService.findAll();

  console.log(people[0].name);

  await PersonService.del(1);

  const newPeople = await PersonService.findAll();
  
  console.log(newPeople[0].name);

  }
  
  main()

  