const jwt = require('../core/shared/token');

module.exports = {

    authRequise: (req, res, next) => {

        let autorization = req.headers.Authorization || req.headers.authorization;
        if(!autorization) return res.status(401).json({msg: 'Demande non autorisée'});
    
        let token = autorization.split(' ')[1];
        if(token === 'null') return res.status(401).json({msg: 'Demande non autorisée'});
       
        let utilisateur = jwt.compare(token);
        if(!utilisateur) return res.status(401).json({msg: 'Demande non autorisée'});

        next();
    },

    authSuivi: (req, res, next) => {

        let autorization = req.headers.Authorization || req.headers.authorization;
        if(!autorization)
        {
            req.utilisateurId = null;
            return next();
        }

        let token = autorization?.split(' ')[1];
        if(token === 'null')
        {
            req.utilisateurId = null;
            return next();
        }

        let utilisateur = jwt.compare(token);
        if(!utilisateur)
        {
            req.utilisateurId = null;
            return next();
        }

        req.utilisateurId = utilisateur.id;
        next();
    }
}