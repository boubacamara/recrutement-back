const { checkSchema, validationResult } = require('express-validator');
const { Utilisateur } = require('../../models');

const creation = [
    checkSchema({
        email: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isEmail: true,
            normalizeEmail:true,
            errorMessage: 'Veuillez saisir une adresse mail valide',
            custom: {
                options: async (email) => {
                    return await Utilisateur.findOne({attributes: ['email'],
                        where: {
                            email
                        }
                    }).then(userExist => {
                        return userExist && Promise.reject('Cet email existe déjà');
                    });
                }
            }  
        },
        pseudo: {
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
        },motDePasse: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            matches: {
                options: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
                errorMessage: 'Doit contenir au minimum: un majuscule, miniscule, un chiffre et un caractère spécial'
            },
            isLength: {
                options: {min: 4},
                errorMessage: 'Le nombre des caractères  minimum est de 4'
            }  
        },
        passeConfirmation: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            custom: {
                options: (value, {req}) => {
                    return value === req.body.motDePasse
                },
                errorMessage: 'Ce champ doit être identique au champ mot de passe'
            }
        }
    }, ['body']),
    (req, res, next) => {

        let erreurs = validationResult(req);
        if(!erreurs.isEmpty()) return res.status(400).json(erreurs.mapped());

        next();
    }
]

const connexion = [
    checkSchema({
        email: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            }
        },
        motDePasse: {
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            } 
        }
    }, ['body']),
    (req, res, next) => {

        let erreurs = validationResult(req);

        if(!erreurs.isEmpty()) return res.status(400).json(erreurs.mapped());

        next();
    }
]

const emailModifier = [
    checkSchema({
        email: {
            optional: true,
            notEmpty: {
                errorMessage: "Ce champ est réquis"
            },
            isEmail: true,
            normalizeEmail:true,
            errorMessage: 'Veuillez saisir une adresse mail valide',
            custom: {
                options: async (email) => {
                    return await Utilisateur.findOne({attributes: ['email'],
                        where: {
                            email
                        }
                    }).then(userExist => {
                        return userExist && Promise.reject('Cet email existe déjà');
                    });
                }
            }  
        },
    }),
    (req, res, next) => {
        let erreurs = validationResult(req);

        if(!erreurs.isEmpty()) return res.status(400).json(erreurs.mapped());

        next();
    }
]

module.exports = {
    creation,
    connexion,
    emailModifier
}