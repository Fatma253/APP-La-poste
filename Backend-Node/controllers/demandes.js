const { validationResult } = require('express-validator');

const Demande = require('../models/demande.js');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allDemandes] = await Demande.fetchAll();
    res.status(200).json(allDemandes);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postDemande = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const sujet = req.body.sujet;
  const date = req.body.date;
  const user = req.body.user;

  try {
    const demande = {
      sujet: sujet,
      date: date,
      user: user,
    };
    const result = await Demande.save(demande);
    res.status(201).json({ message: 'Envoyée!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteDemande = async (req, res, next) => {
  try {
    const deleteResponse = await Demande.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
