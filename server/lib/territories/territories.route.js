const express = require('express');
const Controller = require('./territories.controller');

const router = express.Router();
const controller = Controller();

router.route('/')
  .post(controller.create)
  .get(controller.get);

router.route('/:id')
  .delete(controller.remove)
  .get(controller.getOne);

module.exports = router;
