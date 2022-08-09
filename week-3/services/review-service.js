const BaseService = require('./base-service');
const ReviewModel = require('../models/review');

class ReviewService extends BaseService {
    constructor() {
        super(ReviewModel, `${__dirname}/../review-database.json`);
    }
}

module.exports = new ReviewService();