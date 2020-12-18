const express = require('express');
const Controller = require('./squares.controller');

const router = express.Router();
const controller = Controller();

router.route('/')
  .get(controller.getAll);

router.route('/:x/:y')
  .get(controller.get);

router.route('/:x/:y/paint')
  .patch(controller.patch);

module.exports = router;
