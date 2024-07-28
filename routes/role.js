const router = require('express').Router();

const { authRequise } = require('../middlewares/auth');
const roleCTR = require('../controllers/role.controller');
const roleVLD = require('../core/validation/role');


router.get('/:id/recuperer', authRequise, roleCTR.recuperer);
router.get('/recuperers', authRequise, roleCTR.recupererToutes);
router.post('/enregistrer', authRequise, roleVLD.creation, roleCTR.creation);
router.put('/:id/modifier', authRequise, roleVLD.modifier, roleCTR.modifier);
router.delete('/:id/supprimer', authRequise, roleCTR.supprimer);

module.exports = router;