const router = require('express').Router();

const { authRequise } = require('../middlewares/auth');
const categorieCTR = require('../controllers/categorie.controller');
const categorieVLD = require('../core/validation/categorie');


router.get('/:id/recuperer', authRequise, categorieCTR.recuperer);
router.get('/recuperers', authRequise, categorieCTR.recupererToutes);
router.post('/enregistrer', authRequise, categorieVLD.creation, categorieCTR.creation);
router.put('/:id/modifier', authRequise, categorieVLD.modifier, categorieCTR.modifier);
router.delete('/:id/supprimer', authRequise, categorieCTR.supprimer);

module.exports = router;