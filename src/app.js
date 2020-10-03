const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');

const App = express()

App.use(bodyParser.urlencoded({ extended: true }))
App.use(bodyParser.json())
App.use(routes)

module.exports = App;
