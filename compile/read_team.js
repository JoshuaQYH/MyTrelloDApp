var fs = require('fs');

var teamjson;
fs.readFile('team.json', (err, data) => {  
    if (err) throw err;
    teamjson = JSON.parse(data);
});

module.exports = teamjson;

