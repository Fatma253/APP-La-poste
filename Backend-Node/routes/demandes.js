const express = require('express');

const { body } = require('express-validator');

const demandesController = require('../controllers/demandes');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, demandesController.fetchAll);

router.post(
  '/',
  [
    auth,
    body('sujet').trim().isLength({ min: 5 }).not().isEmpty(),
    body('date').trim().isLength({ min: 10 }).not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  demandesController.postDemande
);

router.delete('/:id', auth, demandesController.deleteDemande);

module.exports = router;
