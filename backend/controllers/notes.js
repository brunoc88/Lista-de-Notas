const noteRouter = require('express').Router()
const Note = require('../models/notes')

noteRouter.post('/notas/alta', (req, res, next) => {
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

noteRouter.get('/notas', (req, res, next) => {
  Note.find({})
    .then(result => {
      return res.status(200).json(result)
    })
    .catch(error => next(error))
})

noteRouter.delete('/notas/borrar/:id', (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

noteRouter.put('/notas/actualizar/:id', (req, res, next) => {
  const id = req.params.id
  const { nota } = req.body

  if (!nota) {
    return res.status(400).json('campo vacio')
  }
  Note.findByIdAndUpdate(id, { nota }, { new: true, runValidators: true })
    .then(result => res.status(204).json('nota actualizada!'))
    .catch(error => next(error))
})

module.exports = noteRouter
