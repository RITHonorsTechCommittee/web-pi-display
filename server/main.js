const app = require('express')();
const server = require('http').Server(app);
//const MongoDB_Client = require('mongodb').MongoClient;

//const url = 'mongodb://localhost:27017';

const db_name = 'web-pi-project';

const PORT = process.env.PORT || 3000;

//MongoDB_Client.connect(url, (err, client) => {
//    if(err) console.log('Error starting MongoDB: '+err);
//    else {
//       console.log("Successfully connected to database!");
//       const db = client.db(db_name);
//       console.log(db.keys);

        app.get('/openweathermaps_api_key', (req, res) => {
            console.log("NEED TO IMPLEMENT: get weather API key from mongodb")
            res.status = '501';
            res.send();
        });
//    }
    //client.close();
//});

app.get('/', (req, res) => { res.sendFile('index.html', {root: './client'});});
app.get('/style.css', (req, res) => {res.sendFile('style.css', {root:'./client'}); });
app.get('/script.js', (req, res) => {res.sendFile('script.js', {root:'./client'}); });

const run = () => {
  server.listen(PORT);
  console.log("Listening on port "+PORT+"...");
};

run();
