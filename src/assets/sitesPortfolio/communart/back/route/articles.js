const express = require("express")
const router = express.Router()
const articleSchema = require('../models/article.js')
const auth=require('../middleware/auth.js')
const multer=require('../middleware/multerConfig.js')
const path=require('path')
const fs=require('fs')


router.post('/article/add',auth,multer,(req, res) => {

    const newArticle = new articleSchema({
        titre: req.body.titre,
        text: req.body.text,
        idUser:req.body.idUser,
        categorie:req.body.categorie,
        auteur:req.body.auteur,
        imageArticle:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    newArticle.save((err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200,
                message: 'article ajouté :' + data
            })
        } else {
            res.status(500).json({
                code: 500,
                message: 'article ajout erreur :' + err
            })
        }
    })

})
router.get('/article/:titre', (req, res) => {
    articleSchema.find({
            titre: req.params.titre
        })
        .then(article => {
            if (!article) {
                res.status(401).json({
                    error: "aucun article trouvé avec ce nom"
                })
            } else {
                res.send(article)
            }
        })
})
router.get('/article', (req, res) => {
    articleSchema.find({})
        .then(article => {
            if (!article) {
                res.status(401).json({
                    error: "aucun article trouvé avec ce nom"
                })
            } else {
                res.send(article)
            }
        })
})
router.delete('/article/:titre',auth,(req, res) => {
    articleSchema.findOne({
        titre: req.params.titre
    }).then(imageArticle=>{
        const imageFichier=imageArticle.image.split('/images/')[1]
        fs.unlink(`images/${imageFichier}`,()=>{
            articleSchema.deleteOne({
                titre: req.params.titre
            })
            .then(article => {
                if (!article) {
                    res.status(401).json({
                        error: "aucun article trouvé avec ce nom"
                    })
                } else {
                    res.send(article)
                }
            })
        })
    })
    .catch(error=>res.status(500).json({error}))
})
router.put('/article/modif/:titre',auth,multer,(req, res) => {
let article=({})
    if(req.file){
          article = ({
            titre: req.body.titre,
            text: req.body.text,
            date:req.body.date,
            categorie:req.body.categorie,
            auteur:req.body.auteur,
            image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }) 
    }else{
          article = ({
            titre: req.body.titre,
            text: req.body.text,
            date:req.body.date,
            categorie:req.body.categorie,
            auteur:req.body.auteur,
        })
    }  
articleSchema.findOneAndUpdate({
            titre: req.params.titre
        }, {$set: article}, {
            new: true
        })
        .then(articleModifie => {
            if (!articleModifie) {
                res.status(401).json({
                    error: "modif impossible car article inexistant"
                })
            } else {
                res.send(articleModifie)
            }
        })
})
module.exports = router