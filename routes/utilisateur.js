const router = require('express').Router();
const { authRequise } = require('../middlewares/auth');
const utilisateurCTR = require('../controllers/utilisateur.controller');
const utilisateurVLD = require('../core/validation/utilisateur');

router.post('/candidat/enregistrer', utilisateurVLD.creation, utilisateurCTR.enregistrer);
router.post('/recruteur/enregistrer', utilisateurVLD.creation, utilisateurCTR.enregistrerRecruteur);
router.post('/connexion', utilisateurVLD.connexion, utilisateurCTR.connexion);
router.get('/utilisateur', authRequise, utilisateurCTR.recuperer);
router.get('/utilisateurs', authRequise, utilisateurCTR.tousLesUtilisateurs);
router.put('/email/modifie-:jeton', authRequise, utilisateurVLD.emailModifier, utilisateurCTR.emailModifier);
router.delete('/utilisateur/supprimer-:jeton', authRequise, utilisateurCTR.supprimer);
router.delete('/utilisateur/deconnexion', authRequise, utilisateurCTR.deconnexion);

module.exports = router;