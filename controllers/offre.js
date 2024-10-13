const { Offre, Utilisateur, Profile, Entreprise, Media } = require('../models');

exports.recuperer = async(req, res) => {

    let id = parseInt(req.params.id);

    try {
        
        let offre = await Offre.findByPk(id, {
            attributes: {
                exclude: ['updatedAt']
            },
            include: [
                {
                    model: Utilisateur,
                    as: 'recruteur',
                    attributes: {
                        exclude: ['motDePasse', 'createdAt', 'updatedAt', 'monJeton']
                    },
                    include: [
                        {
                            model: Profile,
                            as: 'profile',
                            attributes: {
                                exclude: ['dateDeNaissance', 'utilisateurId', 'ville', 'createdAt', 'updatedAt']
                            }
                        }, 
                        {
                            model: Entreprise,
                            as: 'entreprise',
                            attributes: {
                                exclude: ['roleId', 'motDePasse', 'createdAt', 'updatedAt', 'UtilisateurOffres']
                            },
                            include: [
                                {
                                    model: Media,
                                    as: 'media',
                                    attributes: {
                                        exclude: ['roleId', 'motDePasse', 'createdAt', 'updatedAt', 'UtilisateurOffres']
                                    },
                                },
                            ]
                        },
                        {
                            model: Offre,
                            as: 'offre',
                            where: {publier: true}
                        }
                    ]
                },
                {
                    model: Utilisateur,
                    as: 'candidat',
                    include: [
                        {
                            model: Profile,
                            as: 'profile'
                        }
                    ]
                }
            ]
            
        });

        if(!offre) return res.status(401).json({msg: `Aucune offre trouvée avec cet identifiant`});

        res.status(200).json(offre);
    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }

}

exports.recupererToutes = async(req, res) => {
 
    try {
        
        let offres = await Offre.findAll({
            attributes: {
                exclude: ['updatedAt']
            },
            include: {
                model: Utilisateur,
                as: 'recruteur',
                attributes: {
                    exclude: ['motDePasse', 'createdAt', 'updatedAt', 'monJeton']
                },
                include: {
                    model: Profile,
                    as: 'profile',
                    attributes: {
                        exclude: ['dateDeNaissance', 'utilisateurId', 'ville', 'createdAt', 'updatedAt']
                    }
                },
                include: {
                    model: Entreprise,
                    as: 'entreprise'
                }
            },
            where: {
                publier: true
            }            
        });

        if(!offres) return res.status(401).json({msg: `Aucune offre trouvée avec cet identifiant`});

        return res.status(200).json(offres);
    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }

}

exports.recuperersRecruteur = async(req, res) => {

    const recruteurId = parseInt(req.utilisateurId);

    try {
        
        let offres = await Offre.findAll({
            attributes: {
                exclude: ['updatedAt']
            },
            include: [
                {
                    model: Utilisateur,
                    as: 'recruteur',
                    attributes: {
                        exclude: ['motDePasse', 'createdAt', 'updatedAt', 'monJeton']
                    },
                    include: {
                        model: Profile,
                        as: 'profile',
                        attributes: {
                            exclude: ['dateDeNaissance', 'utilisateurId', 'ville', 'createdAt', 'updatedAt']
                        }
                    }
                },
                {
                    model: Utilisateur,
                    as: 'candidat',
                    attributes: {
                        exclude: ['roleId', 'motDePasse', 'createdAt', 'updatedAt', 'UtilisateurOffres']
                    },
                    include: {
                        model: Profile,
                        as: 'profile',
                        attributes: {
                            exclude: ['dateDeNaissance', 'utilisateurId', 'ville', 'createdAt', 'updatedAt']
                        }
                    }
                }
            ],
            where: {
                recruteurId
            }
            
        });

        if(!offres) return res.status(401).json({msg: `Aucune offre trouvée avec cet identifiant`});

        res.status(200).json(offres);
    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }

}

exports.enregistrer = async (req, res) => {

    let offreDonnees = req.body;
    let recruteurId = parseInt(req.utilisateurId);

    try {

        let offre = await Offre.create({
            ...offreDonnees,
            recruteurId
        });

        if(!offre) return res.status(400).json({msg: 'Les informations saisies sont incorrectes, veuillez réessayer'});

        return res.status(201).json({msg: `Offre crée avec succès`, offre})

    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`})
    }
}

exports.modifier = async (req, res) => {
    let id = req.params.id;
    let offreDonnees = req.body;
    let recruteurId = req.utilisateurId;

    try {
        
        let offre = await Offre.findByPk(id, {where: {id, recruteurId}});

        if(!offre) return res.status(400).json({msn: `Aucune offre trouvée avec cet identifiant`});

        offre = await offre.update(offreDonnees);

        if(!offre) return res.status(400).json({msg: `Les modifications n'ont pas puis être effectué`});

        res.status(201).json({msg: `L'offre a été modifier avec succès`});

    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.supprimer = async (req, res) => {

    let id = parseInt(req.params.id);
    let recruteurId = req.utilisateurId;
 
    try {
    
        let offre = await Offre.findOne({where: {id, recruteurId}});

        if(!offre) return res.status(400).json({msn: `Aucune offre trouvée avec cet identifiant`});
  
        await offre.destroy();

        return res.status(200).json({msg: `L'offre supprimée avec succès`});
    } catch (erreurs) {
        return res.status(500).json(erreurs.message);
    }
}

exports.candidature= async (req, res) => {
    const id = parseInt(req.utilisateurId);
    const offreId = parseInt(req.params.id);

try {
  
    const utilisateur = await Utilisateur.findByPk(id);
    
   
    const offre = await Offre.findByPk(offreId);

  
    if (utilisateur && offre) {

       
        await offre.addCandidat(utilisateur);

        return res.status(200).json({
            data: offre,
            msg: "Candidature ajoutée avec succès"
        });
    }

    res.status(400).json({
        msg: "Cette offre n'existe pas ou plus"
    });
    
} catch (error) {
  
    return res.status(500).json({ msg: 'Erreur interne du serveur' });
}
}

exports.supprimerCandidature= async (req, res) => {
    const id = parseInt(req.utilisateurId);
    const offreId = parseInt(req.params.id);

    try {
    
        const utilisateur = await Utilisateur.findByPk(id);
        
    
        const offre = await Offre.findByPk(offreId, {
            include: {
                model: Utilisateur,
                as: 'candidat'
            }
        });

    
        if (utilisateur && offre) {

        
            await offre.removeCandidat(utilisateur);

            return res.status(200).json({
                data: offre,
                msg: "Candidature supprimée avec succès"
            });
        }

        return res.status(400).json({
            msg: "Cette offre n'existe pas ou plus"
        });
        
    } catch (error) {
    
        return res.status(500).json({ msg: 'Erreur interne du serveur' });
    }
}