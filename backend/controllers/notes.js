const noteRouter = require('express').Router()
const Note = require('../models/notes')

noteRouter.post('/notas/alta', async (req, res, next) => {
  try {
    const { nota } = req.body
    if (!nota) {
      return res.status(400).json('bad request')
    }
    const fecha = new Date()

    const note = new Note({
      nota,
      fecha
    })

    const response = await note.save()
    return res.status(201).json(response)
  } catch (error) {
    next(error)
  }
})

noteRouter.get('/notas', async (req, res, next) => {
  try {
    const notes = await Note.find({})
    return res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
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
