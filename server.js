// importing node modules
const http = require('http'),
url = require('url'),
fs = require('fs');


http.createServer((request, response) => {
  // parsing the url request and assign it to addr var
  const addr = request.url;
  const q = url.parse(addr, true);
  let filePath = '';

  // looking if in the URL there is documentation so will take you to documentation page otherwise redirect to index page
  if (q.pathname.includes('documentation')) {
    filePath = (`${__dirname}/documentation.html`);
  } else {
    filePath = 'index.html';
  }

  // this will access the log.txt and make sure there is no issue to it otherwise will populate it with a header and pass in the data
  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Typew': 'text/plain' });
    response.write(data);
    response.end();
  });
  // this will print in the log file the time and URL requested of every request coming in the server file
  fs.appendFile('log.txt', `URL: ${addr}\nTimestamp: ${Date()}\n\n`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });
}).listen(8080, () =>{
  console.log('App listening on port 8080')
});