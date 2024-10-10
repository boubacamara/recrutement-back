const { Profile } = require('../models');

exports.enregistrer = async (req, res) => {
    
    let utilisateurId = parseInt(req.utilisateurId);

    try {

        let profile = await Profile.creationProfile(req.body, utilisateurId)

        return res.status(201).json({
            profile,
            msg: 'Profil complété avec succès '
        });
    } catch (erreurs) {
        return res.status(500).json(erreurs.message);
    }
}

exports.profileModifier = async (req, res) => {
    
    let utilisateurId = parseInt(req.utilisateurId);

    try {
        
        await Profile.modifierProfile(req.body, utilisateurId)

        return res.status(201).json({msg: 'Votre profile a été modifié avec succès'});
    } catch (erreurs) {
        return res.status(400).json(erreurs.message);
    }
}