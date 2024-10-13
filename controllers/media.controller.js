const fs = require('fs');
const sharp = require('sharp');
const { chargerFicher } = require('../core/shared/chargerFichier');
const {Media, Entreprise, Utilisateur} = require('../models');
const { WEBSITE_URL, PORT} = process.env;
const lien = `${WEBSITE_URL}:${PORT}`

exports.chargerCv = async(req, res) => {
    const file = req.files.file;
    const parentId = parseInt(req.utilisateurId);
    
    try {
        
        let utilisateur = await Utilisateur.findByPk(parentId);
        if(utilisateur == null) return res.status(400).json({msg: "Impossible de chargé le CV! Veuillez réessayer"});

        const fichier = chargerFicher(file, ['pdf']);
        if(fichier.verifierFichier == false) return res.status(400).json({msg: "Type de ficher non autorisé! Veuillez chargé un pdf"})

        const cvsucces = await Media.create({
            parentId,
            type: 'cv',
            extension: fichier.extension,
            lien: lien+fichier.cheminFichier
        });
            
        return res.json({msg: 'Votre cv a été charger avec succès'})
    } catch (erreurs) {
        res.json(erreurs.message)
    }
   
}

exports.chargerAvatar = async(req, res) => {
    const file = req.files.file;
    const parentId = parseInt(req.utilisateurId);
    
    try {
        
        let utilisateur = await Utilisateur.findByPk(parentId);
        if(utilisateur == null) return res.status(400).json({msg: "Impossible de chargé la photo! Veuillez réessayer"});

        const fichier = chargerFicher(file, ['png', 'jpg', 'jpeg'], 'avatar');
        if(fichier.verifierFichier == false) return res.status(400).json({msg: "Type de ficher non autorisé! Veuillez chargé un pdf"})
               
        const avatarsucces = await Media.create({
            parentId,
            type: 'avatar',
            extension: fichier.extension,
            lien: lien+fichier.cheminFichier
        });
            
        return res.json({msg: 'Votre avatar a été charger avec succès'})
    } catch (erreurs) {
        res.json(erreurs.message)
    } 
}

exports.chargerEntrepriseImage = async(req, res) => {
    const file = req.files.file;
    const parentId = parseInt(req.params.id);
    
    try {
        
        let entreprise = await Entreprise.findByPk(parentId);
        if(entreprise == null) return res.status(400).json({msg: "Impossible de chargé la photo! Veuillez réessayer"});

        const fichier = chargerFicher(file, ['png', 'jpg', 'jpeg'], 'entreprise');
        if(fichier.verifierFichier == false) return res.status(400).json({msg: "Type de ficher non autorisé! Veuillez chargé un pdf"})
               
        const avatarsucces = await Media.create({
            parentId,
            type: 'entreprise',
            extension: fichier.extension,
            lien: lien+fichier.cheminFichier
        });
            
        return res.json({msg: 'Votre image d\'entreprise a été charger avec succès'})
    } catch (erreurs) {
        res.json(erreurs.message)
    } 
}
