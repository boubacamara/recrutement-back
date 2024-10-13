const bcrypt = require('bcrypt');
const sel = require('../core/shared/sel');
const jwt = require('../core/shared/token');
const { Utilisateur, Profile, Role, Entreprise, Offre, Media } = require('../models');
const { Op } = require('sequelize');

exports.enregistrer = async (req, res) => {

    let { email, motDePasse } = req.body;
    let monJeton = sel.generer();
    let roleId = req.body?.roleId ?? 3;

    try {

        return creationCompte(email, motDePasse, monJeton, roleId, res);

    } catch (error) {
        return res.status(500).json({msg: "Le serveur n'a pas puis répondre"});
    }
}

exports.enregistrerRecruteur = async (req, res) => {

    let { email, motDePasse } = req.body;
    let monJeton = sel.generer();
    let roleId = 2;

    try {
        
        return creationCompte(email, motDePasse, monJeton, roleId, res);

    } catch (error) {
        return res.status(500).json({msg: "Le serveur n'a pas puis répondre"});
    }
}

exports.connexion = async (req, res) => {
    
    const { email, motDePasse } = req.body;

    try {

        let utilisateur = await Utilisateur.connexion(email, motDePasse);
        let token = jwt.creation(utilisateur.id)
        return res.status(201).json({token});
        
    } catch (erreurs) {
        return res.status(401).json({msg: erreurs.message})
    }
}

exports.recuperer = async (req, res) => {

    let id = parseInt(req.query.id) || parseInt(req.utilisateurId);
    
    try {
        let utilisateur = (await Utilisateur.findByPk(id, {
            attributes: { exclude: ['motDePasse', 'updatedAt']},
            include: [
                {
                    model: Profile,
                    as: 'profile',
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                },
                {
                    model: Role,
                    as: 'role',
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                },
                {
                    model: Entreprise,
                    as: 'entreprise',
                    attributes: {exclude: ['updatedAt']},
                    include: [
                        {
                            model: Media,
                            as: "media"
                        }
                    ]
                },
                {
                    model: Offre,
                    as: 'candidature'
                },
                {
                    model: Media,
                    as: 'media'
                }
            ]
        }))?.toJSON();


        !utilisateur && res.status(401).json('Aucun utilisateur trouvé')

        return res.status(200).json(utilisateur);
    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`})
    }
}

exports.tousLesUtilisateurs = async (req, res) => {

    try {
        let utilisateurs = await Utilisateur.findAll({
            attributes: {exclude: ['motDePasse', 'updatedAt']},
            include: [
                {
                    model: Profile,
                    as: 'profile',
                    attributes: {
                        exclude: ['updatedAt']
                    }
                },{
                    model: Role,
                    as: 'role',
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                },{
                    model: Entreprise,
                    as: 'entreprise' 
                }
        ]
        });

        !utilisateurs && res.status(401).json({msg: 'Aucun utilisateur trouvé'})

        return res.status(200).json(utilisateurs);
    } catch (erreurs) {
        return res.status(500).json({msg: `Erreur interne du serveur`})
    }
}

exports.emailModifier = async (req, res) => {
    let { email } = req.body;
    let monJeton = req.params.jeton;

    try {
        
        email = await Utilisateur.modifierEmail(email, monJeton);

        return res.status(201).json({msg: `Émail modifié avec succès ${email}`});
    } catch (erreurs) {
        return res.status(400).json({msg: erreurs.message});
    }
}

exports.supprimer = async (req, res) => {

    let id = parseInt(req.query.id) || parseInt(req.utilisateurId);
    let monJeton = req.params.jeton;

    try {
        let utilisateur = await Utilisateur.findOne({
            where: {
                id,
                monJeton
            }
        });

        if(!utilisateur ) return res.status(400).json({msg: 'Aucun utilisateur trouvé'});

        utilisateur = await utilisateur.destroy({force: true});

        return res.status(201).json({msg: `Le compte a été supprimer avec succès`});
    } catch (erreurs) {
        return res.json(erreurs)
    }
}

async function creationCompte(email, motDePasse, monJeton, roleId, res) {
    let bcryptSel = await bcrypt.genSalt();
    motDePasse = await bcrypt.hash(motDePasse, bcryptSel);
    
    candidat = await Utilisateur.create({
        email,
        motDePasse,
        monJeton,
        roleId
    })

    if(!candidat) return res.status(422).json({msg: "Le compte n'a pas puis être crée"});

    let token = jwt.creation(candidat.id);

    return token && res.status(201).json({
        token,
        msg: "Votre a été crée avec succès"
    })
}

exports.deconnexion = (req, res) => {
    authRequise: (req, res, next) => {

        let autorization = req.headers.Authorization || req.headers.authorization;
        if(!autorization) return res.status(401).json({msg: 'Demande non autorisée'});
    
        let token = autorization?.split(' ')[1];
        if(token === 'null') return res.status(401).json({msg: 'Demande non autorisée'});
       
        let utilisateur = jwt.compare(token);
        if(!utilisateur) return res.status(401).json({msg: 'Demande non autorisée'});

        jwt.destroy(token);

        res.status(203).json({msg: 'Compte déconnecté'});
    }
}