const bcrypt = require('bcrypt');
const jwt = require('../core/shared/token');
const sel = require('../core/shared/sel');
const { Entreprise, Utilisateur } = require('../models');

exports.creation = async (req, res) => {

    let { nom, ninea, adresse, telephone } = req.body;
    let recruteurId = parseInt(req.utilisateurId);
   
    try {

        let entreprise = await Entreprise.findOne({where: {recruteurId}});
        
        if(entreprise?.recruteurId === recruteurId) return res.status(409).json({msg: `Vous ne pouvez pas créer plus d'entreprises`})
        
        let nEntreprise = await Entreprise.create({
            nom,
            ninea,
            adresse,
            telephone,
            recruteurId
        })
        return res.json(nEntreprise)
        if(!entreprise) return res.status(400).json({msg: 'Les informations saisies sont incorrectes, veuillez réessayer'});

        return res.status(201).json({msg: `Entreprise, ${entreprise.nom} crée avec succès`});
    } catch (erreurs) {
        return res.status(500).json(erreurs.message);
    }
}

exports.modifier = async (req, res) => {

    let utilisateurId = parseInt(req.utilisateurId);
    let entrepriseId = parseInt(req.params.id);
  
    try {

        await Entreprise.modifierEntreprise(req.body, utilisateurId, entrepriseId);

        return res.status(201).json({msg: `L'entreprise a été modifier avec succès`});
    } catch (erreurs) {
        return res.status(400).json(erreurs.message)
    }
    
}

exports.recuperer = async (req, res) => {

    let recruteurId = parseInt(req.utilisateurId);
    let entrepriseId = parseInt(req.params.id);
    try {

        let entreprises = await Entreprise.findOne({
            where: {
                id: entrepriseId,
                recruteurId
            },
            attributes: {exclude: ['updatedAt']},
            include: {
                model: Utilisateur,
                as: 'recruteur',
                attributes: {
                    exclude: ['motDePasse', 'createdAt', 'updatedAt']
                }
            }
        });

        if(!entreprises) return res.status(404).json({msg: `Aucune entreprise n'a été trouvée`});

        return res.status(200).json(entreprises);
    } catch (error) {
        return res.status(404).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.entrepriseParRecruteur = async (req, res) => {

    let recruteurId = parseInt(req.utilisateurId);

    try {

        let entreprises = await Entreprise.findAll({
            where: {recruteurId},
            attributes: {exclude: ['updatedAt']},
            include: {
                model: Utilisateur,
                as: 'recruteur',
                attributes: {
                    exclude: ['motDePasse', 'createdAt', 'updatedAt']
                }
            }
        });

        if(!entreprises) return res.status(404).json({msg: `Aucune entreprise n'a été trouvée`});

        return res.status(200).json(entreprises);
    } catch (error) {
        return res.status(404).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.toutesLesEntreprises = async (req, res) => {

    try {

        let entreprises = await Entreprise.findAll({
            attributes: {exclude: ['updatedAt']},
            include: {
                model: Utilisateur,
                as: 'recruteur',
                attributes: {
                    exclude: ['motDePasse', 'createdAt', 'updatedAt']
                }
            }
        });
        if(!entreprises) return res.status(404).json({msg: `Aucune entreprise n'a été trouvée`});

        return res.status(200).json(entreprises);
    } catch (error) {
        return res.status(404).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.supprimer = async (req, res) => {

    let recruteurId = parseInt(req.utilisateurId);
    let entrepriseId = parseInt(req.params.id);

    try {

        let entreprise = await Entreprise.findByPk(entrepriseId);

        if(!entreprise) res.status(404).json({msg: 'Aucun entreprise trouvé avec cet identifiant'});
        if(entreprise.recruteurId !== recruteurId) res.status(403).json({msg: 'Accès non autorisé'});

        await entreprise.destroy();

        return res.status(200).json({msg: `Entreprise ${entreprise.nom} a été supprimé avec succèss`})
    } catch (erreurs) {
        return res.status(500).json(`Le serveur n'a pas puis répondre`);
    }
}