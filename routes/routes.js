const route = require('express').Router();

const utilisateurRTR = require('./utilisateur');
const profileRTR = require('./profile');
const entrepriseRTR = require('./entreprise');

route.get('', (req, res) => res.status(200).send('Hello world'));

route.use('/api', utilisateurRTR);
route.use('/api/utilisateur', profileRTR);
route.use('/api/entreprise', entrepriseRTR);

module.exports = route;