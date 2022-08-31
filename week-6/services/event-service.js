const BaseService = require('./base-service');
const EventModel = require('../models/event');

class EventService extends BaseService {
    model = EventModel
}

module.exports = new EventService();