const express = require('express');
const Controller = require('./errors.controller');

const router = express.Router();
const controller = Controller();

router.route('/')
  .get(controller.get);

module.exports = router;
