const { Router } = require('express')

const routes = Router();

//definindo rotas
routes.get('/', (req, res) => {
  res.send('hello')
})

module.exports = routes;

