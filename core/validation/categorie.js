const { checkSchema, validationResult } = require('express-validator');
const { Categorie } = require('../../models');

exports.creation = [
    checkSchema({
        intitule: {
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            custom: {
                options: async (intitule) => {
                    return await Categorie.findOne({ attributes: ['intitule'],
                            where: {intitule}
                        }).then((intituleExist) => {
                            return intituleExist && Promise.reject('Cette catégorie existe déjà');
                        })
                }
            },
            isString: {
                errorMessage: "Le titre doit être une chaine de caractères"
            },
            isLength: {
                options: {min: 2, max: 255},
                errorMessage: 'Le nombre de caractères doit être comprise de 2 - 255'
            }
        }
    }, ['body']),
    (req, res, next) => {

        let erreurs = validationResult(req);

        if(!erreurs.isEmpty()) return res.status(401).json(erreurs.mapped());

        next();
    }
]

exports.modifier = [
    checkSchema({
        intitule: {
            optional: true,
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isString: {
                errorMessage: "Le titre doit être une chaine de caractères"
            },
            isLength: {
                options: {max: 255},
                errorMessage: 'Le nombre de caractères maximum est 255'
            }
        }
    }, ['body']),
    (req, res, next) => {

        let erreurs = validationResult(req);

        if(!erreurs.isEmpty()) return res.status(401).json(erreurs.mapped());

        next();
    }
]