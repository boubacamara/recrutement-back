const generer= (taille = 25) => {

    resultats = '';

    for(let i = 0; i < taille; i++)
    {
        alphanum = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890';

        resultats += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
    }

    return resultats;
}

module.exports = {
    generer
}