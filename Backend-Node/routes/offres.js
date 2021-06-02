const express = require('express');

const { body } = require('express-validator');

const offresController = require('../controllers/offres');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, offresController.fetchAll);

router.post(
  '/',
  [
    auth,
    body('titre').trim().isLength({ min: 5 }).not().isEmpty(),
    body('description').trim().isLength({ min: 10 }).not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  offresController.postOffre
);

router.delete('/:id', auth, offresController.deleteOffre);

module.exports = router;
