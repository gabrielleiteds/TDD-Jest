const { Router } = require('express')

//controllers
const SessionController = require('./controllers/SessionController')

//middleware authentication
const authMiddleware = require('./middleware/Auth')

const routes = Router();

//definindo rotas
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware) //se aplica apenas as que vem depois desta linha

routes.get('/dashboard', (req, res) => {
  return res.status(200).send()
})

module.exports = routes;

