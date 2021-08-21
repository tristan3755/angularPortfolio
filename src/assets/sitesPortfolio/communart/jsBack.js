let token = ""
let userId = ""
let idArticle=""

/*connexion*/

let coMail=document.querySelector('.blocConnexion input:nth-child(1)')

coMail.addEventListener('click',()=>{
    console.log('click')
})
let coPassword=document.querySelector('.blocConnexion input:nth-child(2)')
coPassword.addEventListener('click',()=>{
    console.log('clickPass')
})

let boutonCoBack=document.querySelector('.boutonCoFormulaire')

boutonCoBack.addEventListener('click',()=>{
connexion()
 console.log('click')   
})


function connexion(){
    
    let mesValeursCo={
mailUsers:coMail.value,
password:coPassword.value,
}
    let urlCo="http://localhost:3000/users/connexion"
    fetch(urlCo,{method:'POST',headers:{"Content-Type": "application/json; charset=UTF-8",},body:JSON.stringify(mesValeursCo)})
    .then((res)=>res.json())
    .then((res)=>{
        (token = res.token), (userId = res.userId);
        console.log(userId)
        let blocErreur=document.createElement('p')
        blocErreur.innerHTML='erreur d\'identifiants ou de mot de passe'
        blocErreur.style.position='absolute'
        blocErreur.style.bottom="10px"
        blocErreur.style.color='#893142'

        let boutonConnexionHeader=document.querySelector('.boutonConnexion')
        let boutonInscriptionHeader=document.querySelector('.boutonInscription')
        let header=document.getElementById('nav')
        let boutonDeco=document.querySelector('.deco')
        let bontonInsMobile=document.querySelector('#menuMobile div:nth-child(1)')
        let bontonCoMobile=document.querySelector('#menuMobile div:nth-child(2)')

        let gestion=document.createElement('div')
        gestion.classList='boutonGestion'
        gestion.style.display='none'
        let a=document.createElement('a')
        a.innerHTML=" mes articles"
        gestion.appendChild(a)
        header.appendChild(gestion)

monBlocCo.appendChild(blocErreur)
        if(res.code==200){
            monBlocCo.style.display='none'
            blocErreur.style.display='none'
            blocErreur.innerHTML='vous êtes connecté'
            boutonConnexionHeader.style.display='none'
            boutonInscriptionHeader.style.display='none'
            boutonDeco.style.display='flex'
            bontonCoMobile.style.display='none'
            bontonInsMobile.style.display='none'
            gestion.style.display="flex"
            document.getElementById('gestionConnect').style.display="flex"
        }else if(res.code==401){ 
            blocErreur.style.display='flex'
        }
        gestion.addEventListener('click',()=>{
            document.getElementById('dashBoard').style.display='flex'
                })
                document.getElementById('gestionConnect').addEventListener('click',()=>{
                    document.getElementById('dashBoard').style.display='flex'
                })
                document.querySelector('#dashBoard div:nth-child(4)').addEventListener('click',()=>{
                    document.getElementById('dashBoard').style.display='none'
                })
                boutonDeco.addEventListener('click',()=>{
                    window.location.reload()
                })
                document.querySelector('#dashBoard div:nth-child(1)').addEventListener('click',()=>{
                    document.getElementById('formAjout').style.display='flex'
                })
    })
    .catch()
}
/* inscription*/
let urlInscription='http://localhost:3000/users/inscription'

validation.addEventListener('click',(e)=>{
    e.preventDefault()


    const formData=new FormData()
    formData.append('mailUsers',mailUsers.value)
    formData.append('password',password.value)
    formData.append('image',image.files[0])

    /*console.log(formData.get('mailUsers'))*/
if(inputPassword.value==inputPasswordVerif.value){
   fetch(urlInscription,{method:'post',body:formData})
    .then((res)=>res.json())
    .then((res)=>{
        if(res.code!==200){
            let error=document.createElement('p')
            error.innerHTML='utilisateur existe déja'
            error.style.position="absolute"
            error.style.bottom='10px'
            error.style.color='#893142'
            monBlocInscription.appendChild(error)

        }else{
            monBlocInscription.style.display='none'
            monBlocCo.style.display='flex'
        }
    })
    .catch()
}else{
    let errorPass=document.createElement('p')
    errorPass.innerHTML='mauvaise concordance des mots de passe'
    errorPass.style.position="absolute"
    errorPass.style.bottom='10px'
    errorPass.style.color='#893142'
    monBlocInscription.appendChild(errorPass)
}
})

/*post article*/

let idUser=document.getElementById('idUser')
let urlPostArticle='http://localhost:3000/redaction/article/add'

let boutonFormAjout=document.getElementById('boutonFormAjout')
boutonFormAjout.style.border="none"



boutonFormAjout.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(userId)
    idUser.value=userId
   const formData=new FormData()
   formData.append('titre',titre.value)
   formData.append('text',text.value)
   formData.append('categorie',categorie.value)
   formData.append('auteur',auteur.value)
   formData.append('imageArticle',imageArticle.files[0])
   formData.append('idUser',idUser.value=userId)

   if(titre.value!==''&&text.value!==''&&categorie.value!==''&&auteur.value!==''){
   fetch(urlPostArticle,{method:'POST',body:formData,headers: {
    Authorization: "Bearer" + " " + token,
  },})
   .then((res)=>res.json())
   .then((res)=>{

    console.log(res.code)
      if(res.code!==200){
           console.log(res.code)
       }else{
           console.log('no problemo')
           document.getElementById('formAjout').style.display='none'
       }
   })
}else{
    let blocAjoutError=document.createElement('p')
     blocAjoutError.innerHTML='problème d\'ajout, veuillez bien remplir tous les champs s\'il vous plaît'
     blocAjoutError.style.display="flex"
     blocAjoutError.style.position='absolute'
     blocAjoutError.style.top='0'
     blocAjoutError.style.color='#893142'
     document.getElementById('formAjout').appendChild(blocAjoutError)
}

})

/*get modif article*/

let urlGetarticleModif="http://localhost:3000/redaction/article/id/"
let urlModifArticle="http://localhost:3000/redaction/article/modif/"
let articleModifPage=document.getElementById('articleModif')
let monBlocModif=document.createElement('div')
monBlocModif.classList='blocImageModif'
articleModifPage.appendChild(monBlocModif)
boutonModifArticle.addEventListener('click',()=>{
    monBlocModif.innerHTML=''
    fetch(urlGetarticleModif+userId,{method:'GET',headers: {
        Authorization: "Bearer" + " " + token,
        "Content-Type": "application/json; charset=UTF-8",
      }})
      .then((res)=>res.json())
      .then((res)=>{
for(let i in res){
let blocImage=document.createElement('div')
blocImage.style.backgroundImage='url('+res[i].imageArticle+')'
blocImage.classList='imageAvantModif'

blocImage.addEventListener('click',()=>{
    console.log('click article'+res[i]._id)

    let formulaireModif=document.createElement('form')
    formulaireModif.classList='formModif'
    formulaireModif.style.display='flex'

    let validationModif = document.createElement("button");
    validationModif.className = "boutonInscriptionFormulaire";
    validationModif.type='submit'
    validationModif.innerHTML='modifier mon article'
    validationModif.style.border="none"
    
    let inputTitreModif = document.createElement("input");
    inputTitreModif.type = "text";
    inputTitreModif.id='titre'
    inputTitreModif.required=true
    inputTitreModif.value=res[i].titre

    formulaireModif.appendChild(inputTitreModif)

    let inputTextModif = document.createElement("textarea");
    inputTextModif.type = "text";
    inputTextModif.id='text'
    inputTextModif.required=true
    inputTextModif.value=res[i].text

    formulaireModif.appendChild(inputTextModif)

    let inputTextCategorie= document.createElement("select");
    inputTextCategorie.type = "text";
    inputTextCategorie.id='categorie'
    inputTextCategorie.required=true

    let inputTextCategorieOption=document.createElement('option')
    inputTextCategorieOption.innerHTML=res[i].categorie
    inputTextCategorie.appendChild(inputTextCategorieOption)

    let inputTextCategorieOption1=document.createElement('option')
    inputTextCategorieOption1.innerHTML="Peinture"
    inputTextCategorie.appendChild(inputTextCategorieOption1)

    let inputTextCategorieOption2=document.createElement('option')
    inputTextCategorieOption2.innerHTML="Sculpture"
    inputTextCategorie.appendChild(inputTextCategorieOption2)
    
    let inputTextCategorieOption3=document.createElement('option')
    inputTextCategorieOption3.innerHTML="Architecture"
    inputTextCategorie.appendChild(inputTextCategorieOption3)

    let inputTextCategorieOption4=document.createElement('option')
    inputTextCategorieOption4.innerHTML="Arts scénique"
    inputTextCategorie.appendChild(inputTextCategorieOption4)

    let inputTextCategorieOption5=document.createElement('option')
    inputTextCategorieOption5.innerHTML="Artisanat"
    inputTextCategorie.appendChild(inputTextCategorieOption5)

    formulaireModif.appendChild(inputTextCategorie)

    let inputTextAuteur= document.createElement("input");
    inputTextAuteur.type = "text";
    inputTextAuteur.id='auteur'
    inputTextAuteur.required=true
    inputTextAuteur.value=res[i].auteur

    formulaireModif.appendChild(inputTextAuteur)

    let inputFichierModif = document.createElement("input");
    inputFichierModif.type = "file";
    inputFichierModif.id="imageArticle"
    inputFichierModif.accept="image/png, image/jpeg,image/jpg"
    inputFichierModif.label='votre image d\'article'

    
    formulaireModif.appendChild(inputFichierModif)

    idArticle=res[i]._id

  
    formulaireModif.appendChild(validationModif)


    validationModif.addEventListener('click',(e)=>{
     
        e.preventDefault()
        monBlocModif.innerHTML=''
        articleModifPage.style.display='none'
        console.log(idArticle)
        
        const formData=new FormData()
        formData.append('titre',inputTitreModif.value)
        formData.append('text',inputTextModif.value)
        formData.append('categorie',inputTextCategorie.value)
        formData.append('auteur',inputTextAuteur.value)
        formData.append('imageArticle',inputFichierModif.files[0])
        console.log(inputTitreModif.value)

        if(inputTitreModif.value!==''&&inputTextModif.value!==''&&inputTextCategorie.value!==''&&inputTextAuteur.value!==''){

        fetch(urlModifArticle+idArticle,{method:'PUT',body:formData,headers:{
            Authorization: "Bearer" + " " + token,
          },})
          .then((res)=>res.json())
          .then((res)=>{
            if(res.code!==200){
            console.log(res.code)
            }else{
                formulaireModif.style.display='none'
                console.log('no problemo')
                console.log(res.code)
            }
        })
    }else{
          let blocModifError=document.createElement('p')
        blocModifError.innerHTML='problème pour modifier, veuillez bien remplir tous les champs s\'il vous plaît'
        blocModifError.style.display="flex"
        blocModifError.style.position='absolute'
        blocModifError.style.top='0'
        blocModifError.style.color='#893142'
        formulaireModif.appendChild(blocModifError)
    }
console.log(inputTitreModif.value)
    })

/*svg croix*/

    let divSvg=document.createElement('div')
    divSvg.classList='croixFermModif'


    let croixSvg=document.createElementNS('http://www.w3.org/2000/svg','svg')
    croixSvg.setAttribute('width','100%')
    croixSvg.setAttribute('height','100%')
    croixSvg.setAttribute('viewBox','0 0 716 716')
    croixSvg.setAttribute('fill','none')
    /*croixSvg.setAttribute('xmlns','http://www.w3.org/2000/svg')*/

    let line1=document.createElementNS('http://www.w3.org/2000/svg','line')
    line1.setAttribute('x1','523.021')
    line1.setAttribute('y1',"176.23")
    line1.setAttribute('x2',"190.77")
    line1.setAttribute('y2',"537.741")
    line1.setAttribute('stroke',"white")
    line1.setAttribute('stroke-width',15)
    line1.setAttribute('stroke-linecap',"round")


    let line2=document.createElementNS('http://www.w3.org/2000/svg','line')
    line2.setAttribute('x1',"533.68")
    line2.setAttribute('y1',"529.648")
    line2.setAttribute('x2',"172.169")
    line2.setAttribute('y2',"197.397")
    line2.setAttribute('stroke',"white")
    line2.setAttribute('stroke-width',15)
    line2.setAttribute('stroke-linecap',"round")


    croixSvg.addEventListener('click',()=>{
        formulaireModif.style.display='none'
    })

    croixSvg.appendChild(line1)
    croixSvg.appendChild(line2)
    divSvg.appendChild(croixSvg)
    formulaireModif.appendChild(divSvg)   
/*svg croix*/
    document.getElementById('sect1').appendChild(formulaireModif)
})

let blocParaImage=document.createElement('p')
blocParaImage.innerHTML=res[i].titre
blocParaImage.classList='paraModifPage'
blocImage.appendChild(blocParaImage)
monBlocModif.appendChild(blocImage)
}


          console.log(res)
      })

      console.log(userId)
})

/***************************************************PreSub******************************************************/

let urlSupp='http://localhost:3000/redaction/article/supp/'

let articleSuppPage=document.getElementById('articleSupp')
let suppImage=document.createElement('div')
suppImage.classList='blocImageModif'
articleSuppPage.appendChild(suppImage)

let boutonSupp=document.querySelector('#dashBoard div:nth-child(3)')
boutonSupp.addEventListener('click',()=>{
    suppImage.innerHTML=''
    articleSuppPage.style.display="flex"

    fetch(urlGetarticleModif+userId,{method:'GET',headers: {
        Authorization: "Bearer" + " " + token,
        "Content-Type": "application/json; charset=UTF-8",
      }})
      .then((res)=>res.json())
      .then((res)=>{
    for(let i in res){
    let blocImageSupp=document.createElement('div')
    blocImageSupp.style.backgroundImage='url('+res[i].imageArticle+')'
    blocImageSupp.classList='imageAvantModif'
    suppImage.appendChild(blocImageSupp)

    blocImageSupp.addEventListener('click',()=>{
        console.log(idArticle=res[i]._id)
        
        fetch(urlSupp+idArticle,{method:'DELETE',headers:{
            Authorization: "Bearer" + " " + token,
            "Content-Type": "application/json; charset=UTF-8",
        }})
        .then((res)=>res.json())
        articleSuppPage.style.display="none"
    })
    }
    })
})
let croixSupp=document.querySelector('.croixSuppFermeture')
croixSupp.addEventListener('click',()=>{
    articleSuppPage.style.display="none"
})
