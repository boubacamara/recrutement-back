const { Categorie } = require('../models');

exports.creation = async (req, res) => {

    let { intitule} = req.body;

    try {
        let categorie = await Categorie.create({intitule});

        if(!categorie) return res.status(400).json({msg: 'Les informations saisies sont incorrectes, veuillez réessayer'});

        return res.status(201).json({msg: `${categorie.intitule} crée avec succès`});

    } catch (error) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
    
}

exports.recuperer = async (req, res) => {

    let id = parseInt(req.params.id);

    try {
        
        let categorie = await Categorie.findByPk(id);

        if(!categorie) return res.status(404).json({msg: `Aucune catégorie trouvée avec cet identifiant`});

        res.status(201).json(categorie);

    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.recupererToutes = async (req, res) => {

    try {

        let categories = await Categorie.findAll();
        if(!categories) return res.status(404).json({msg: `Aucune catégorie trouvée avec cet identifiant`});

        return res.status(200).json(categories);
    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.modifier = async (req, res) => {

    let id = parseInt(req.params.id);
    let { intitule } = req.body;

    try {
        
        let categorie = await Categorie.findByPk(id);

        if(!categorie) return res.status(404).json({msg: `Aucune catégorie trouvée avec cet identifiant`});

        await categorie.update({intitule});

        res.status(201).json({msg: `La catégorie a été modifier avec succès`});

    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
}

exports.supprimer = async (req, res) => {

    let id = parseInt(req.params.id);

    try {
        
        let categorie = await Categorie.findByPk(id);

        if(!categorie) return res.status(404).json({msg: `Aucune catégorie trouvée avec cet identifiant`});

        await categorie.destroy();

        res.status(200).json({msg: `${categorie.intitule} supprimer avec succès`});

    } catch (erreurs) {
        return res.status(500).json({msg: `Le serveur n'a pas puis répondre`});
    }
}