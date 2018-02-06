const app = require('express')();
const server = require('http').Server(app);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => { res.sendFile('index.html', {root: './client'});});
app.get('/style.css', (req, res) => {res.sendFile('style.css', {root:'./client'}); });
app.get('/script.js', (req, res) => {res.sendFile('script.js', {root:'./client'}); });

const run = () => {
  server.listen(PORT);
  console.log("Listening on port "+PORT+"...");
};

run();
