const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<center>Padma Sai in project GET</center>`);

    const parseurl = url.parse(req.url, true);
    const { username, email, password } = parseurl.query;

    res.write(`
      <center>
        Username: <strong>${username}</strong><br>
        Email: <strong>${email}</strong><br>
        Password: <strong>${password}</strong><br>
      </center>
    `);
    res.end();
  } else if (req.method === "POST") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<center>Padma Sai POST</center>`);

    let inputs = "";
    req.on('data', flag => {
      inputs += flag.toString();
    });

    req.on('end', () => {
      const { username, email, password, genre } = querystring.parse(inputs);

      res.write(`
        <center>
          Username: <strong>${username}</strong><br>
          Email: <strong>${email}</strong><br>
          Password: <strong>${password}</strong><br>
          Favorite Genre: <strong>${genre}</strong><br>
        </center>
      `);
      res.end();
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/html' });
    res.write(`<center>Invalid Method</center>`);
    res.end();
  }
});

server.listen(5864, function (error) {
  if (error) {
    console.log("Something went wrong");
  } else {
    console.log("Server running at http://localhost:5864");
  }
});
