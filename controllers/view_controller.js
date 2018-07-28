var path = require('path');

var redirectView = function(req, res){
    console.log('trdt');
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
};

module.exports = redirectView;