let express = require('Express');
let app = express();

let router = require('./router.js');

//both router.js and server.js should be in same directory
app.use('/', router);

app.listen(8080);