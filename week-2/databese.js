const fs = require('fs');

const save = function(data) {
    fs.writeFileSync('event.json', JSON.stringify(data));
}

const load = function(data) {
    console.log(data)
}

module.exports = { save, load }