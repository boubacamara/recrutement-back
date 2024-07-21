const jwt = require('jsonwebtoken');

const creation = (utilisateurId) => {
    return jwt.sign({id: utilisateurId}, process.env.JWT_SECRET);
}

const compare = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    creation,
    compare
}