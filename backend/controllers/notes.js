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

    const savedNote = await note.save()
    return res.status(201).json(savedNote)
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

noteRouter.delete('/notas/borrar/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const findNote = await Note.findById(id)

    if (!findNote) {
      return res.status(404).json({ error: 'No Found' })
    }
    await Note.findByIdAndDelete(id)
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
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
