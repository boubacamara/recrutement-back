const router = require('express').Router();
const { authRequise } = require('../middlewares/auth');
const profileVLD = require('../core/validation/profile');
const profileCTR = require('../controllers/profile.controller');

router.post('/profile/enregistrer', authRequise, profileVLD.creation, profileCTR.enregistrer);
router.put('/profile/modifier', authRequise, profileVLD.modifier, profileCTR.profileModifier);

module.exports = router;