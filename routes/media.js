const route = require('express').Router();
const mediaCTR = require('../controllers/media.controller');
const {  authRequise } = require('../middlewares/auth');

route.post('/utilisateur/charger/cv',authRequise, mediaCTR.chargerCv);
route.post('/utilisateur/charger/avatar', authRequise, mediaCTR.chargerAvatar);
route.post('/utilisateur/charger/entreprise/:id', authRequise, mediaCTR.chargerEntrepriseImage);

module.exports = route;