let token = ""
let userId = ""
let idArticle=""
let userImage=""

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
    let urlCo="https://mysterious-mesa-82638.herokuapp.com/users/connexion"
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
let urlInscription='https://mysterious-mesa-82638.herokuapp.com/users/inscription'

validation.addEventListener('click',(e)=>{
    e.preventDefault()


    const formData=new FormData()
    formData.append('mailUsers',mailUsers.value)
    formData.append('password',password.value)
    formData.append('image',image.files[0])

if(inputPassword.value==inputPasswordVerif.value){
   fetch(urlInscription,{method:'post', body:formData})
    .then((res)=>res.json())
    .then((res)=>{
        if(res.code==500){
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
    .catch(err=>{
        console.log(err)
    })
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
document.querySelector('#dashBoard div:nth-child(1)').addEventListener('click',()=>{
    imageArticle.files[0]==''
    let urlRecupUser="https://mysterious-mesa-82638.herokuapp.com/users/usersCo/"

    fetch(urlRecupUser+userId,{method:'GET',headers:{"Content-Type": "application/json; charset=UTF-8", 
    Authorization: "Bearer" + " " + token,}})
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        userImage=res.image
        console.log(res.image)
    })

})

let idUser=document.getElementById('idUser')
let urlPostArticle='https://mysterious-mesa-82638.herokuapp.com/redaction/article/add'

let boutonFormAjout=document.getElementById('boutonFormAjout')
boutonFormAjout.style.border="none"

boutonFormAjout.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(userId)
    idUser.value=userId
    console.log(userImage)
   const formData=new FormData()
   formData.append('titre',titre.value)
   formData.append('text',text.value)
   formData.append('categorie',categorie.value)
   formData.append('auteur',auteur.value)
   formData.append('imageArticle',imageArticle.files[0])
   formData.append('idUser',idUser.value=userId)
   formData.append('idUserImage',idUserImage.value=userImage)

   if(titre.value!==''&&text.value!==''&&categorie.value!==''&&auteur.value!==''){
   fetch(urlPostArticle,{method:'POST',body:formData,headers: {
    Authorization: "Bearer" + " " + token,
  },})
   .then((res)=>res.json())
   .then((res)=>{

      if(res.code==500){
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

let urlGetarticleModif="https://mysterious-mesa-82638.herokuapp.com/redaction/article/id/"
let urlModifArticle="https://mysterious-mesa-82638.herokuapp.com/redaction/article/modif/"
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

let voileImage=document.createElement('div')
voileImage.classList='voileImageAvantModif'
blocImage.appendChild(voileImage)

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
    inputFichierModif.addEventListener('click',()=>{
        console.log('click modif')
        console.log(inputFichierModif.value)
    })

    /*effet input*/

    inputTitreModif.addEventListener("click",()=>{
    inputTitreModif.style.width = "500px";
  });
    inputTextAuteur.addEventListener("click",()=>{
    inputTextAuteur.style.width = "500px";
  });
    
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
            if(res.code==401){
            console.log(res.code)
            }else{
                formulaireModif.style.display='none'
                console.log('no problemo')
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
console.log(inputFichierModif.value)
if(inputFichierModif.value!==''){
    console.log('clickImageModif')
    console.log(idArticle+'click modif supp image')
    let urlModifSuppImage='https://mysterious-mesa-82638.herokuapp.com/redaction/article/suppImage/'

    fetch(urlModifSuppImage+idArticle,{method:'DELETE',headers: {
        Authorization: "Bearer" + " " + token,
        "Content-Type": "application/json; charset=UTF-8",
      }})
      .then(res=>res.json())
}
})

/*svg croix*/

    let divSvg=document.createElement('div')
    divSvg.classList='croixFermModif'


    let croixSvg=document.createElementNS('http://www.w3.org/2000/svg','svg')
    croixSvg.setAttribute('width','100%')
    croixSvg.setAttribute('height','100%')
    croixSvg.setAttribute('viewBox','0 0 716 716')
    croixSvg.setAttribute('fill','none')

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


let dateArticle= res[i].createdAt.split('T')
console.log(dateArticle)

let date1=dateArticle[0]
console.log(date1)

let date2=date1.split('-')
console.log(date2)

let dateFinie=date2[2]+'/'+date2[1]+'/'+date2[0]

let blocParaImage=document.createElement('p')
blocParaImage.innerHTML=res[i].titre + ',article rédigé le : ' + dateFinie
blocParaImage.classList='paraModifPage'

blocImage.appendChild(blocParaImage)

blocImage.appendChild(blocParaImage)
monBlocModif.appendChild(blocImage)
}
console.log(res)
})
console.log(userId)
})

/***************************************************PreSub******************************************************/

let urlSupp='https://mysterious-mesa-82638.herokuapp.com/redaction/article/supp/'

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
/*******************************************getAll*****************************************************/

let urlGetAll='https://mysterious-mesa-82638.herokuapp.com/redaction/article'
let sliderArticle=document.getElementById('slider')
fetch(urlGetAll,{method:'GET',headers:{"Content-Type": "application/json; charset=UTF-8"}})
.then((res)=>res.json())
.then((res)=>{
    console.log(res)

for (let i = 0; i < 12; i++){
let carteArticle=document.createElement('div')
carteArticle.classList='carteArticle'

let carteImage=document.createElement('div')
carteImage.classList='carteArticleHeadImg2'
carteImage.style.backgroundImage='url('+res[i].imageArticle+')'

let carteArticleHead=document.createElement('div')
carteArticleHead.classList='carteArticleHead'
carteArticle.appendChild(carteArticleHead)

let carteArticleHeadDate=document.createElement('p')
carteArticleHeadDate.classList='carteArticleHeadDate'

let dateArticle= res[i].createdAt.split('T')

let date1=dateArticle[0]

let date2=date1.split('-')

let dateFinie=date2[2]+'/'+date2[1]+'/'+date2[0]

carteArticleHeadDate.innerHTML=dateFinie

let carteArticleHeadImg=document.createElement('div')
carteArticleHeadImg.classList='carteArticleHeadImg'
carteArticleHeadImg.style.backgroundImage='url('+res[i].idUserImage+')'

let titreCarte=document.createElement('div')
titreCarte.classList='divTitre'


let titreCarteP=document.createElement('p')
titreCarteP.innerHTML=res[i].titre
carteArticleHead.appendChild(carteArticleHeadImg)

carteArticleHead.appendChild(carteArticleHeadDate)

carteArticle.appendChild(carteImage)
titreCarte.appendChild(titreCarteP)
carteArticle.appendChild(titreCarte)
sliderArticle.appendChild(carteArticle)
/***********************************************************articleStar ****************************************************/
carteArticle.addEventListener('click',()=>{

    let ficheArticle=document.createElement('article')
    ficheArticle.classList='ficheArticle'
    ficheArticle.style.display='flex'

    document.getElementById('sect1').appendChild(ficheArticle)

    let imageFiche=document.createElement('div')
    imageFiche.classList='imageFiche'
    imageFiche.style.backgroundImage='url('+res[i].imageArticle+')'

    ficheArticle.appendChild(imageFiche)

    
    let voileFiche=document.createElement('div')
    voileFiche.classList="voileFiche"

    imageFiche.appendChild(voileFiche)

    let titreFiche=document.createElement('p')
    titreFiche.classList="titreFiche"
    titreFiche.innerHTML=res[i].titre

    imageFiche.appendChild(titreFiche)

    
    let auteurFiche=document.createElement('p')
    auteurFiche.classList="auteurFiche"
    auteurFiche.innerHTML=res[i].auteur

    imageFiche.appendChild(auteurFiche)


    ficheArticle.appendChild(imageFiche)

    let textFiche=document.createElement('p')
    textFiche.classList="textFiche"
    textFiche.innerHTML=res[i].text

    ficheArticle.appendChild(textFiche)

    
let retour=document.createElement('div')
retour.classList="retour"

let retourSvg=document.createElementNS('http://www.w3.org/2000/svg','svg')
retourSvg.setAttribute('width','100%')
retourSvg.setAttribute('height','100%')
retourSvg.setAttribute('viewBox','0 0 561 472')
retourSvg.setAttribute('fill','none')
let path1=document.createElementNS('http://www.w3.org/2000/svg','path')
path1.setAttribute('d','M147.568 235.5L208.921 296.041L114.669 235.5L208.921 174.959L147.568 235.5Z')
path1.setAttribute('fill','black')
retourSvg.appendChild(path1)
let path2=document.createElementNS('http://www.w3.org/2000/svg','path')
path2.setAttribute('d','M114.669 235.5L208.921 174.959L147.568 235.5L208.921 296.041L114.669 235.5ZM114.669 235.5L446.33 235.5')
path2.setAttribute('stroke','black')
path2.setAttribute('stroke-width','5')
retourSvg.appendChild(path2)
let path3=document.createElementNS('http://www.w3.org/2000/svg','path')
path3.setAttribute('d','M553.5 236C553.5 361.035 432.54 464.5 280.5 464.5C128.46 464.5 7.5 361.035 7.5 236C7.5 110.965 128.46 7.5 280.5 7.5C432.54 7.5 553.5 110.965 553.5 236Z')
path3.setAttribute('stroke','black')
path3.setAttribute('stroke-width','5')
retourSvg.appendChild(path3)
retour.appendChild(retourSvg)


retourSvg.addEventListener('click',()=>{
    ficheArticle.style.display="none"
})

let blocAuteurArticle=document.createElement('div')
blocAuteurArticle.classList='blocAuteurArticle'

let dateArticle= res[i].createdAt.split('T')
console.log(dateArticle)

let date1=dateArticle[0]
console.log(date1)

let date2=date1.split('-')
console.log(date2)

let dateFinie=date2[2]+'/'+date2[1]+'/'+date2[0]

let textAuteur=document.createElement('p')
textAuteur.innerHTML='article:'+ dateFinie
textAuteur.classList="textAuteur"

blocAuteurArticle.appendChild(textAuteur)

let imageAuteur=document.createElement('div')
imageAuteur.classList='imageAuteur'
imageAuteur.style.backgroundImage='url('+res[i].idUserImage+')'
ficheArticle.appendChild(blocAuteurArticle)
blocAuteurArticle.appendChild(imageAuteur)
ficheArticle.appendChild(retour)

})

}
})
/*inject slider ajax */
document.querySelector('#dashBoard div:nth-child(4)').addEventListener('click',()=>{
    sliderArticle.innerHTML=""

    fetch(urlGetAll,{method:'GET',headers:{"Content-Type": "application/json; charset=UTF-8"}})
.then((res)=>res.json())
.then((res)=>{
    console.log(res)

for (let i = 0; i < 12; i++){
carteArticle=document.createElement('div')
carteArticle.classList='carteArticle'

 carteImage=document.createElement('div')
carteImage.classList='carteArticleHeadImg2'
carteImage.style.backgroundImage='url('+res[i].imageArticle+')'

 carteArticleHead=document.createElement('div')
carteArticleHead.classList='carteArticleHead'
carteArticle.appendChild(carteArticleHead)

carteArticleHeadDate=document.createElement('p')
carteArticleHeadDate.classList='carteArticleHeadDate'

 dateArticle= res[i].createdAt.split('T')

date1=dateArticle[0]

date2=date1.split('-')

 dateFinie=date2[2]+'/'+date2[1]+'/'+date2[0]

carteArticleHeadDate.innerHTML=dateFinie

carteArticleHeadImg=document.createElement('div')
carteArticleHeadImg.classList='carteArticleHeadImg'
carteArticleHeadImg.style.backgroundImage='url('+res[i].idUserImage+')'

titreCarte=document.createElement('div')
titreCarte.classList='divTitre'


 titreCarteP=document.createElement('p')
titreCarteP.innerHTML=res[i].titre
carteArticleHead.appendChild(carteArticleHeadImg)

carteArticleHead.appendChild(carteArticleHeadDate)

carteArticle.appendChild(carteImage)
titreCarte.appendChild(titreCarteP)
carteArticle.appendChild(titreCarte)
sliderArticle.appendChild(carteArticle)

carteArticle.addEventListener('click',()=>{

    ficheArticle=document.createElement('article')
    ficheArticle.classList='ficheArticle'
    ficheArticle.style.display='flex'

    document.getElementById('sect1').appendChild(ficheArticle)

    imageFiche=document.createElement('div')
    imageFiche.classList='imageFiche'
    imageFiche.style.backgroundImage='url('+res[i].imageArticle+')'

    ficheArticle.appendChild(imageFiche)

    
    voileFiche=document.createElement('div')
    voileFiche.classList="voileFiche"

    imageFiche.appendChild(voileFiche)

     titreFiche=document.createElement('p')
    titreFiche.classList="titreFiche"
    titreFiche.innerHTML=res[i].titre

    imageFiche.appendChild(titreFiche)

    
    auteurFiche=document.createElement('p')
    auteurFiche.classList="auteurFiche"
    auteurFiche.innerHTML=res[i].auteur

    imageFiche.appendChild(auteurFiche)


    ficheArticle.appendChild(imageFiche)

    textFiche=document.createElement('p')
    textFiche.classList="textFiche"
    textFiche.innerHTML=res[i].text

    ficheArticle.appendChild(textFiche)

    
retour=document.createElement('div')
retour.classList="retour"

retourSvg=document.createElementNS('http://www.w3.org/2000/svg','svg')
retourSvg.setAttribute('width','100%')
retourSvg.setAttribute('height','100%')
retourSvg.setAttribute('viewBox','0 0 561 472')
retourSvg.setAttribute('fill','none')
 path1=document.createElementNS('http://www.w3.org/2000/svg','path')
path1.setAttribute('d','M147.568 235.5L208.921 296.041L114.669 235.5L208.921 174.959L147.568 235.5Z')
path1.setAttribute('fill','black')
retourSvg.appendChild(path1)
path2=document.createElementNS('http://www.w3.org/2000/svg','path')
path2.setAttribute('d','M114.669 235.5L208.921 174.959L147.568 235.5L208.921 296.041L114.669 235.5ZM114.669 235.5L446.33 235.5')
path2.setAttribute('stroke','black')
path2.setAttribute('stroke-width','5')
retourSvg.appendChild(path2)
 path3=document.createElementNS('http://www.w3.org/2000/svg','path')
path3.setAttribute('d','M553.5 236C553.5 361.035 432.54 464.5 280.5 464.5C128.46 464.5 7.5 361.035 7.5 236C7.5 110.965 128.46 7.5 280.5 7.5C432.54 7.5 553.5 110.965 553.5 236Z')
path3.setAttribute('stroke','black')
path3.setAttribute('stroke-width','5')
retourSvg.appendChild(path3)
retour.appendChild(retourSvg)


retourSvg.addEventListener('click',()=>{
    ficheArticle.style.display="none"
})

blocAuteurArticle=document.createElement('div')
blocAuteurArticle.classList='blocAuteurArticle'

dateArticle= res[i].createdAt.split('T')
console.log(dateArticle)

date1=dateArticle[0]
console.log(date1)

date2=date1.split('-')
console.log(date2)

dateFinie=date2[2]+'/'+date2[1]+'/'+date2[0]

 textAuteur=document.createElement('p')
textAuteur.innerHTML='article:'+ dateFinie
textAuteur.classList="textAuteur"

blocAuteurArticle.appendChild(textAuteur)

imageAuteur=document.createElement('div')
imageAuteur.classList='imageAuteur'
imageAuteur.style.backgroundImage='url('+res[i].idUserImage+')'
ficheArticle.appendChild(blocAuteurArticle)
blocAuteurArticle.appendChild(imageAuteur)
ficheArticle.appendChild(retour)

})


}
})
})