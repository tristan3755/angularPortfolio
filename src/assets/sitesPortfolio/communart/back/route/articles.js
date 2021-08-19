const express = require("express")
const router = express.Router()
const articleSchema = require('../models/article.js')
const auth=require('../middleware/auth.js')
const multer=require('../middleware/multerConfig.js')
const path=require('path')
const fs=require('fs')
const article = require("../models/article.js")


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
router.get('/article',(req, res) => {
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
/*get par id*/
router.get('/article/id/:idUser',auth,(req,res)=>{
    articleSchema.find({
        idUser:req.params.idUser
    })
    .then(article=>{
        if (!article) {
            res.status(401).json({
                error: "aucun article trouvé avec cet id"
            })
        } else {
            res.send(article)  
        }
    })
})
router.delete('/article/supp/:_id',auth,multer,(req, res) => {
    articleSchema.findOne({
        _id: req.params._id
    }).then(imageAsupp=>{
        const imageFichier=imageAsupp.imageArticle.split('/images/')[1]
        fs.unlink(`images/${imageFichier}`,()=>{
            articleSchema.deleteOne({
                _id: req.params._id
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
})
router.put('/article/modif/:_id',auth,multer,(req, res) => {
let article=({})
    if(req.file){
          article = ({
            titre: req.body.titre,
            text: req.body.text,
            categorie:req.body.categorie,
            auteur:req.body.auteur,
            imageArticle:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }) 
    }else{
          article = ({
            titre: req.body.titre,
            text: req.body.text,
            categorie:req.body.categorie,
            auteur:req.body.auteur,
        })
    }  
articleSchema.findOneAndUpdate({
            _id: req.params._id
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