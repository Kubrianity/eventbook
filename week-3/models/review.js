module.exports = class Review {
    constructor(comment, rating, name, id) {
        this.comment = comment;
        this.rating = rating;
        this.name = name;
        this.id = id;
    }
    static create({comment, rating, name, id}) {
        return new Review(comment, rating, name, id)
    }
}
