// A controller exists with routes for GET, POST, PUT/PATCH, and DELETE requests
const { Router } = require('express');
const Stranger = require('../models/Stranger');

module.exports = Router()
  .post('/', async (req, res) => {
    const stranger = await Stranger.insert(req.body);
    res.json(stranger);
  })

  .get('/', async (req, res, next) => {
    try {
      const strangers = await Stranger.getAll();
      res.json(strangers);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const stranger = await Stranger.getById(req.params.id);
      res.json(stranger);
    } catch (e) {
      next(e);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const stranger = await Stranger.updateById(req.params.id, req.body);
      res.json(stranger);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const stranger = await Stranger.deleteById(req.params.id);
      res.json(stranger);
    } catch (e) {
      next(e);
    }
  });
