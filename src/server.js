const App = require('./app');
const Http = require('http');

const server = Http.createServer(App)

server.listen(process.env.PORT || 8000, () => {
  console.log('servidor rodando')
})