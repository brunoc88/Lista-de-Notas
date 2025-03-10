require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/notes')
const cors = require('cors');

app.use(express.static('dist'));
app.use(cors());
app.use(express.json())

app.post('/notas/alta', (req, res, next) => {
  const { nota } = req.body
  if (!nota) {
    return res.status(400).json('Campo vacío')
  }

  const fecha = new Date()

  const note = new Note({
    nota,
    fecha
  })

  note.save()
    .then(result => res.status(201).json(result))
    .catch(error => next(error))
})

app.get('/notas', (req, res, next) => {
  Note.find({})
    .then(result => {
      return res.status(200).json(result)
    })
    .catch(error => next(error))
})

app.delete('/notas/borrar/:id', (req, res, next) => {
  const id = req.params.id

  Note.findOneAndDelete(id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.put('/notas/actualizar/:id', (req, res, next) => {
  const id = req.params.id
  const { nota } = req.body

  if (!nota) {
    return res.status(400).json('campo vacio')
  }
  Note.findByIdAndUpdate(id, { nota }, { new: true, runValidators: true })
    .then(result => res.status(204).json('nota actualizada!'))
    .catch(error => next(error))
})

app.use((req, res, nex) => {
  res.status(404).json('ruta desconocida!');
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Escuchando puerto: ${PORT}`)
})


