
const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the ShoppingList model, which we'll
// interact with in our GET endpoint
const {ShoppingList} = require('./models');
const {Recipes} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at. Note that 
// normally you wouldn't do this. Usually your
// server will simply expose the state of the
// underlying database.
ShoppingList.create('black beans', 2);
ShoppingList.create('red tomatoes', 3);
ShoppingList.create('orange peppers', 4);

Recipes.create('tacos',['meat','shells','guacamole','rice','beans','olives']);
Recipes.create('california roll',['rice','crab','avocaco','sesame seeds']);
Recipes.create('new york crunch roll',['rice','crab','avocaco','fried onions','spicy mayo']);

// when the root of this route is called with GET, return
// all current ShoppingList items by calling `ShoppingList.get()`
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

app.get('/recipe-list', (req, res) => {
  res.json(Recipes.get());
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 3000}`);
});
