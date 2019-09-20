require('dotenv').config();

const express= require('express');
const bodyParser = require('body-parser');
const http = require('http');

const {PORT : port} = process.env;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




server.listen(port, () => {
  console.log(`Server listening to port ${port}`);
  
});