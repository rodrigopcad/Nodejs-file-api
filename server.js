require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const initRoutes = require('./routes');

global.__basedir = __dirname;

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors({ origin: '*' }))
  .use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

initRoutes(app);

app.listen(process.env.APP_PORT, () => {
  console.log('Servidor escutando a porta ' + process.env.APP_PORT);
});
