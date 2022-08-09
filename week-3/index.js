const Person = require('./models/person')
const EventModel = require('./models/event')
const PersonService = require('./services/person-service')
const EventService = require('./services/event-service')
const ReviewService = require('./services/review-service')

async function main() {

  const kubra = new Person('Kubra', 'example@email.com')
  const kevser = new Person('Kevser', 'example2@email.com')
  const mark = new Person('Mark', 'example3@email.com');
  
  const rockfest = new EventModel('Rock Festival', 'Ankara', '01-01-2023  04-01-2023');

  const artexhibition = new EventModel('Modern Art Exhibiton', 'Istanbul', '01-09-2022')

  mark.signup(rockfest);
  kubra.signup(rockfest);
  kevser.signup(rockfest);

  kevser.signup(artexhibition);
    
  kubra.connect(kevser);
  kubra.connect(mark);
  kevser.connect(mark);

  await PersonService.add(mark);
  await PersonService.add(kubra);
  await PersonService.add(kevser);
  
  await EventService.add(rockfest);
  await EventService.add(artexhibition);

  kevser.makeComment('I am so excited to join this event!', 5)
  mark.makeComment('It will be awesome, i cant wait to see it!', 5)

  await ReviewService.add(kevser.reviews)
  await ReviewService.add(mark.reviews)

  const reviews = ReviewService.findAll();

  console.log(reviews);

  // const person = await PersonService.find(1);

  // console.log(person);

  // await PersonService.del(1);

  // const newPeople = await PersonService.findAll();
  
  // console.log(newPeople[0].name);
  }
  
main();

  