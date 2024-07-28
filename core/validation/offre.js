const { checkSchema, validationResult } = require('express-validator');

exports.creation = [
    checkSchema({
        titre: {
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
        },
        description: {
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isString: {
                errorMessage: "La description doit être une chaine de caractères"
            },
            isLength: {
                options: {min: 2},
                errorMessage: 'Le nombre de caractères minimum est 25'
            }
        },
        lieu: {
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isString: {
                errorMessage: "Le lieu doit être une chaine de caractères"
            },
            isLength: {
                options: {max: 255},
                errorMessage: 'Le nombre de caractères maximum est 255'
            }
        },
        typeContrat: {
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isIn: {
                options: [['cdi', 'cdd', 'intérim', 'stage', 'alternance', 'freelance']],
                errorMessage: "Le type de contrat doit être l\'un des suivants: cdi, cdd, intérim, stage, alternance, freelance"
            }
        },
        salaire: {
            optional: true,
            isDecimal: "Le salaire doit être un nombre décimal",
            toFloat: true
        },
        exigences: {
            optional: true,
            isString: {
                errorMessage: "Les exigences doivent être une chaîne de caractères",
            },
        },
        competences: {
            optional: true,
            isString: {
                errorMessage: "Les compétences doivent être une chaîne de caractères",
            },
        },
        experienceRequise: {
            optional: true,
            isString: {
                errorMessage: "L'expérience requise doit être une chaîne de caractères"
            },
            isLength: {
                options: { max: 255 },
                errorMessage: "L'expérience requise doit avoir au maximum 255 caractères"
            }
        },
        educationRequise: {
            optional: true,
            isString: {
                errorMessage: "Le niveau d'éducation requis doit être une chaîne de caractères",
            },
            isLength: {
                options: { max: 255 },
                errorMessage: "Le niveau d'éducation requis doit avoir au maximum 255 caractères",
            }
        },
        categorieId: {
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isInt: {
                errorMessage: "La catégorie doit être de type entier",
            },
            toInt: true
        },
        public: {
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isBoolean: {
                errorMessage: "La catégorie doit être de type booléen",
            },
            toBoolean: true
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
        titre: {
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
        },
        description: {
            optional: true,
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isString: {
                errorMessage: "La description doit être une chaine de caractères"
            },
            isLength: {
                options: {min: 2},
                errorMessage: 'Le nombre de caractères minimum est 25'
            }
        },
        lieu: {
            optional: true,
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isString: {
                errorMessage: "Le lieu doit être une chaine de caractères"
            },
            isLength: {
                options: {max: 255},
                errorMessage: 'Le nombre de caractères maximum est 255'
            }
        },
        typeContrat: {
            optional: true,
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isIn: {
                options: [['cdi', 'cdd', 'intérim', 'stage', 'alternance', 'freelance']],
                errorMessage: "Le type de contrat doit être l\'un des suivants: cdi, cdd, intérim, stage, alternance, freelance"
            }
        },
        salaire: {
            optional: true,
            isDecimal: "Le salaire doit être un nombre décimal",
            toFloat: true
        },
        exigences: {
            optional: true,
            isString: {
                errorMessage: "Les exigences doivent être une chaîne de caractères",
            },
        },
        competences: {
            optional: true,
            isString: {
                errorMessage: "Les compétences doivent être une chaîne de caractères",
            },
        },
        experienceRequise: {
            optional: true,
            isString: {
                errorMessage: "L'expérience requise doit être une chaîne de caractères"
            },
            isLength: {
                options: { max: 255 },
                errorMessage: "L'expérience requise doit avoir au maximum 255 caractères"
            }
        },
        educationRequise: {
            optional: true,
            isString: {
                errorMessage: "Le niveau d'éducation requis doit être une chaîne de caractères",
            },
            isLength: {
                options: { max: 255 },
                errorMessage: "Le niveau d'éducation requis doit avoir au maximum 255 caractères",
            }
        },
        public: {
            notEmpty: {
                errorMessage: 'Ce champ est réquis'
            },
            isBoolean: {
                errorMessage: "La catégorie doit être de type booléen",
            },
            toBoolean: true
        }
    }, ['body']),
    (req, res, next) => {

        let erreurs = validationResult(req);

        if(!erreurs.isEmpty()) return res.status(401).json(erreurs.mapped());

        next();
    }
]