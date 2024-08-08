const { checkSchema, validationResult } = require('express-validator');
const { User } = require('../../models');

exports.creation = [
    checkSchema({
        nom: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isAlphanumeric: {
                errorMessage: "Ce champ n'accepte que les caractères alphanumérique"
            },
            isLength: {
                options: {min: 2, max: 70},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-70 caractères'
            }
        },
        prenom: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isAlphanumeric: {
                errorMessage: "Ce champ n'accepte que les caractères alphanumérique"
            },
            isLength: {
                options: {min: 2, max: 70},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-70 caractères'
            }
        },
        dateDeNaissance: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isDate: {
                errorMessage: "Ce champ doit être de type date"
            },
            toDate: true
        },
        telephone: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isInt: {
                errorMessage: "Ce champ doit être de type numérique"
            },
            toInt: true
        },
        ville: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isAlphanumeric: {
                errorMessage: "Ce champ n'accepte que les caractères alphanumérique"
            },
            isLength: {
                options: {min: 2, max: 255},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-255 caractères'
            }
        },
        
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
            isAlphanumeric: {
                errorMessage: "Ce champ n'accepte que les caractères alphanumérique"
            },
            isLength: {
                options: {min: 2, max: 70},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-70 caractères'
            }
        },
        prenom: {
            optional: true,
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isAlphanumeric: {
                errorMessage: "Ce champ n'accepte que les caractères alphanumérique"
            },
            isLength: {
                options: {min: 2, max: 70},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-70 caractères'
            }
        },
        dateDeNaissance: {
            optional: true,
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isDate: {
                errorMessage: "Ce champ doit être de type date"
            },
            toDate: true
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
        },
        ville: {
            optional: true,
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isAlphanumeric: {
                errorMessage: "Ce champ n'accepte que les caractères alphanumérique"
            },
            isLength: {
                options: {min: 2, max: 255},
                errorMessage: 'Le nombre des caractères doit être compris entre 2-255 caractères'
            }
        },
        
    }, ['body']),
    (req, res, next) => {

        erreurs = validationResult(req);

        if(!erreurs.isEmpty()) return res.status(422).json(erreurs.mapped());

        next();
    }
]