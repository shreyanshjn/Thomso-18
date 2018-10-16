// Whitelist

 var whitelist = ['in.thomso.thomso2018', 'com.project.nikhil.thomso17', 'com.example.kira.thomso18',  'com.example.kira.thomso18media',  'com.example.kira.thomso18user'];

if (process.env.REACT_APP_SERVER_ENVIORNMENT === 'dev') {
  whitelist = ['in.thomso.thomso2018', 'com.project.nikhil.thomso17'];
}
var corsOptions = function (req, callback) {
  var corsOptions1;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions1 = { origin: true } 
  }else{
    corsOptions1 = { origin: false } 
  }
  callback(null, corsOptions1) 
}

module.exports = corsOptions;
