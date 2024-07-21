const bcrypt = require('bcrypt');
const sel = require('../core/shared/sel');
const jwt = require('../core/shared/token');
const { Utilisateur } = require('../models');

exports.enregistrer = async (req, res) => {

    let { email, pseudo, motDePasse } = req.body;
    let monJeton = sel.generer();
    let roleId = req.body?.roleId ?? 3;

    try {
        
        return creationCompte(email, pseudo, motDePasse, monJeton, roleId, res);

    } catch (error) {
        return res.status(500).json({msg: "Le serveur n'a pas puis répondre"});
    }
}

exports.enregistrerRecruteur = async (req, res) => {

    let { email, pseudo, motDePasse } = req.body;
    let monJeton = sel.generer();
    let roleId = 2;

    try {
        
        return creationCompte(email, pseudo, motDePasse, monJeton, roleId, res);

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

    let id = parseInt(req.utilisateurId);

    try {
        let {motDePasse, updatedAt, profile, ...leRest} = (await Utilisateur.findByPk(id, {
            include: 'profile'
        })).toJSON();

        let {createdAt: pCreatedat, updatedAt: pUdatedAt, ...restProfile} = profile;

        let utilisateur = await {...leRest, profile: restProfile};

        !utilisateur && res.status(401).json('Aucun utilisateur trouvé')

        return res.status(200).json(utilisateur);
    } catch (erreurs) {
        return res.status(500).json(`Le serveur n'a pas puis répondre`)
    }
}

exports.tousLesUtilisateurs = async (req, res) => {

    try {
        let utilisateurs = await Utilisateur.findAll({
            include: ['profile']
        });

        !utilisateurs && res.status(401).json('Aucun utilisateur trouvé')

        return res.status(200).json(utilisateurs);
    } catch (erreurs) {
        return res.status(500).json(`Le serveur n'a pas puis répondre`)
    }
}

exports.emailModifier = async (req, res) => {
    let { email } = req.body;
    let monJeton = req.params.jeton;

    try {
        
        email = await Utilisateur.modifierEmail(email, monJeton);

        return res.status(201).json(`Émail modifié avec succès ${email}`);
    } catch (erreurs) {
        return res.status(400).json({msg: erreurs.message});
    }
}

exports.supprimer = async (req, res) => {

    let id = parseInt(req.utilisateurId);
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

        return res.status(201).json(`${utilisateur.pseudo} votre compte a été supprimer avec succès`);
    } catch (erreurs) {
        return res.json(erreurs)
    }
}

async function creationCompte(email, pseudo, motDePasse, monJeton, roleId, res) {
    let bcryptSel = await bcrypt.genSalt();
    motDePasse = await bcrypt.hash(motDePasse, bcryptSel);
    
    candidat = await Utilisateur.create({
        email,
        pseudo,
        motDePasse,
        monJeton,
        roleId
    })

    if(!candidat) return res.status(422).json({msg: "Le compte n'a pas puis être crée"});

    let token = jwt.creation(candidat.id);

    token && res.status(201).json({token})
}