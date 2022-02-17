const path = require('path');
const express = require('express');
const routes = require('./controllers');
// import sequelize connection
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// parse requests in JSON format
app.use(express.json()); 
// parse requests in url format
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => { 
  app.listen(PORT, () => console.log('App now listening!'));
});
