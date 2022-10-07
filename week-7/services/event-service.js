const BaseService = require('./base-service');
const EventModel = require('../models/event');

class EventService extends BaseService {
    model = EventModel

    async findAndFilterByDate() {
        try {
            let currentDate = new Date().toISOString();
            await this.model.updateMany({ date: { $lt: currentDate }}, { isActive: false })
        }
        catch(err) {
            console.log(err)
        }
        finally {
            return await this.findAll()
        }
    }
}
module.exports = new EventService();