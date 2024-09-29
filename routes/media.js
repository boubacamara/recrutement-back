const route = require('express').Router();
const mediaCTR = require('../controllers/media.controller');
const {  authRequise } = require('../middlewares/auth');

route.post('/utilisateur/charger/cv',authRequise, mediaCTR.chargerCv);
route.post('/utilisateur/charger/avatar', authRequise, mediaCTR.chargerAvatar);

module.exports = route;