const { Role } = require('../models');

exports.creation = async (req, res) => {

    let { intitule} = req.body;

    try {
        let role = await Role.create({intitule});

        if(!role) return res.status(400).json({msg: 'Les informations saisies sont incorrectes, veuillez réessayer'});

        return res.status(201).json({msg: `${role.intitule} crée avec succès`});

    } catch (erreurs) {
        return res.status(500).json(erreurs.message);
    }
    
}

exports.recuperer = async (req, res) => {

    let id = parseInt(req.params.id);

    try {
        
        let role = await Role.findByPk(id);

        if(!role) return res.status(404).json({msg: `Aucun role trouvé avec cet identifiant`});

        res.status(201).json(role);

    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.recupererToutes = async (req, res) => {

    try {

        let roles = await Role.findAll();
        if(!roles) return res.status(404).json({msg: `Aucun role trouvé avec cet identifiant`});

        return res.status(200).json(roles);
    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.modifier = async (req, res) => {

    let id = parseInt(req.query) || parseInt(req.params.id);
    
    let { intitule } = req.body;

    try {
        
        let role = await Role.findByPk(id);

        if(!role) return res.status(404).json({msg: `Aucun role trouvé avec cet identifiant`});

        await role.update({intitule});

        res.status(201).json({msg: `Le role a été modifier avec succès`});

    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.supprimer = async (req, res) => {

    let id = parseInt(req.params.id);

    try {
        
        let role = await Role.findByPk(id);

        if(!role) return res.status(404).json({msg: `Aucun role trouvé avec cet identifiant`});

        await role.destroy();

        res.status(200).json({msg: `${role.intitule} supprimer avec succès`});

    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
}