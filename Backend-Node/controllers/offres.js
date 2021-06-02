const { validationResult } = require('express-validator');

const Offre = require('../models/offre');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allOffres] = await Offre.fetchAll();
    res.status(200).json(allOffres);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postOffre = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const titre = req.body.titre;
  const description = req.body.description;
  const user = req.body.user;

  try {
    const offre = {
      titre: titre,
      description: description,
      user: user,
    };
    const result = await Offre.save(offre);
    res.status(201).json({ message: 'Enregistrée!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteOffre = async (req, res, next) => {
  try {
    const deleteResponse = await Offre.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
