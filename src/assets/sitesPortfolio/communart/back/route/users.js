const express=require('express')
const jwt=require('jsonwebtoken')
const router=express.Router()
const bcrypt=require('bcryptjs')
const usersSchema=require('../models/users.js')
const multer=require('../middleware/multerConfigProfils.js')

router.post('/inscription',multer,(req,res)=>{
   bcrypt.hash(req.body.password,10)
   .then(hash=>{
       const newUser= new usersSchema({
           password:hash,
           mailUsers:req.body.mailUsers,
           image:`${req.protocol}://${req.get('host')}/imageProfils/${req.file.filename}`
       })
       newUser.save((data)=>{
        res.status(200).json({code:200,message:'utilisateur ajouté :'+data})
       })/*.catch((err)=>{
        res.status(500).json({code:500,message:'problème :'+err})
       })*/
   }
   )
})
router.post('/connexion',(req,res)=>{
    usersSchema.findOne({mailUsers:req.body.mailUsers })
    .then(user=>{
        if(!user){
            return res.status(401).json({code:401,message:"identifiants erronés"})
        }

        bcrypt.compare(req.body.password,user.password)
        .then(passwordOk=>{
            if(!passwordOk){
           return res.status(401).json({code:401,message:"password incorrect"})    
            }
            res.status(200).json({code:200,userId:user._id,token:jwt.sign({userId:user._id},
                'ramdonSecretToken',
                {expiresIn:'24h'}
            )

            })
        })
    })
})

module.exports=router