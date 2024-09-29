const { generer } = require("./sel");
const path = require('path');

const chargerFicher = (file, extAutoriser = [], chemin='cv')=> {
    let nom = generer(15);
    let extension = file.name.split('.');
    extension = extension[extension.length -1];
    let nouveauNom = `${nom.toLowerCase()}.${extension}`;
    let cheminFichier = `/media/${chemin}/`+nouveauNom;

    
    let verifierFichier = extAutoriser.map(file => file?.toLowerCase().includes(extension.toLowerCase()))
    
    verifierFichier = (verifierFichier.constructor === Array) ? verifierFichier[0] : verifierFichier;
   
    if(verifierFichier == true) file.mv(path.join(__dirname, '../../public', cheminFichier));


    return {
        verifierFichier,
        cheminFichier,
        extension
    };
}

module.exports = {
    chargerFicher
}