const app = require('./app')
const { info } = require('./utils/loggers')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
  info(`Escuchando puerto: ${PORT}`)
})
