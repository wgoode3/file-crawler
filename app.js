const http = require('http'),
      port = 8000,
      fC   = require('./fileCrawler.js');

app = http.createServer( (req, res) => { fC(req, res); });

app.listen( port, () => { console.log(`Running in localhost at port ${port}`); });