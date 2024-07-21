const router = require('express').Router();
const { authRequise } = require('../middlewares/auth');
const entrepriseVLD = require('../core/validation/entreprise');
const entrepriseCTR = require('../controllers/entreprise');

router.get('/:id/recuperer', authRequise, entrepriseCTR.recuperer);
router.get('/recuperers', authRequise, entrepriseCTR.toutesLesEntreprises);
router.get('/recuperers/utilisateur', authRequise, entrepriseCTR.entrepriseParRecruteur);
router.post('/enregistrer', authRequise, entrepriseVLD.creation, entrepriseCTR.creation);
router.put('/:id/modifier', authRequise, entrepriseVLD.modifier, entrepriseCTR.modifier);
router.delete('/:id/supprimer', authRequise, entrepriseCTR.supprimer);

module.exports = router;