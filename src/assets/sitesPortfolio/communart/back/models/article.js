const mongoose=require('mongoose')
const articleSchema=mongoose.Schema({

    titre:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true,
    },
    text:{
        type:String,
        require:true,
    },
    categorie:{
        type:String,
        require:true,
    },
    auteur:{
        type:String,
        require:true,
    },
    image:{
        type:String,
    }
},{timestamps:true})

module.exports=mongoose.model('articles',articleSchema)