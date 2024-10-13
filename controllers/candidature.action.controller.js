const { UtilisateurOffres } = require('../models')

exports.accepter = async (req, res) => {
    const offreId = parseInt(req.params.offreId);
    const candidatId = parseInt(req.params.candidatId);

    try {
        const candidature = await UtilisateurOffres.findOne({
            where: {
                offreId,
                UtilisateurId: candidatId
            }
        });

        if(!candidature) return res.status(404).json({msg: `Cette candidature n'existe pas ou plus`});

        candidature.statut = req.body.accepter;

        await candidature.save();

        res.status(200).json({msg: "Le candidat a été accepté, est sera averti par mail"})
    } catch (error) {
        res.status(500).json({msg: 'Erreur interne du serveur'})
    }

}

exports.refuser = async (req, res) => {
    const offreId = parseInt(req.params.offreId);
    const candidatId = parseInt(req.params.candidatId);

    try {
        const candidature = await UtilisateurOffres.findOne({
            where: {
                offreId,
                UtilisateurId: candidatId
            }
        });

        if(!candidature) return res.status(404).json({msg: `Cette candidature n'existe pas ou plus`});

        candidature.statut = req.body.refuser;

        await candidature.save();

        res.status(200).json({msg: "Le candidat a été refuser, est sera averti par mail"})
    } catch (error) {
        res.status(500).json({msg: 'Erreur interne du serveur'})
    }

}