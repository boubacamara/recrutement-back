const { checkSchema, validationResult } = require('express-validator');
const { Utilisateur } = require('../../models');

exports.creation = [
    checkSchema({
        nom: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isString: {
                errorMessage: "Le nom doit être une chaine de caractères"
            },
            isLength: {
                options: {min: 2, max: 255},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-255 caractères'
            }
        },
        ninea: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isString: {
                errorMessage: "Le ninea doit être une chaine de caractères"
            },
            isLength: {
                options: {min: 2, max: 255},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-255 caractères'
            }
        },
        adresse: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isString: {
                errorMessage: "L'adresse doit être une chaine de caractères"
            },
            isLength: {
                options: {max: 255},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-255 caractères'
            }
        },
        telephone: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isInt: {
                errorMessage: "Ce champ doit être de type numérique"
            },
            toInt: true
        }
        
    }, ['body']),
    (req, res, next) => {

        erreurs = validationResult(req);

        if(!erreurs.isEmpty()) return res.status(422).json(erreurs.mapped());

        next();
    }
]

exports.modifier = [
    checkSchema({
        nom: {
            optional: true,
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isString: {
                errorMessage: "Le nom doit être une chaine de caractères"
            },
            isLength: {
                options: {min: 2, max: 255},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-255 caractères'
            }
        },
        ninea: {
            optional: true,
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isString: {
                errorMessage: "Le ninea doit être une chaine de caractères"
            },
            isLength: {
                options: {min: 2, max: 255},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-255 caractères'
            }
        },
        adresse: {
            optional: true,
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isString: {
                errorMessage: "L'adresse doit être une chaine de caractères"
            },
            isLength: {
                options: {max: 255},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-255 caractères'
            }
        },
        telephone: {
            optional: true,
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isInt: {
                errorMessage: "Ce champ doit être de type numérique"
            },
            toInt: true
        }
        
    }, ['body']),
    (req, res, next) => {

        erreurs = validationResult(req);

        if(!erreurs.isEmpty()) return res.status(422).json(erreurs.mapped());

        next();
    }
]