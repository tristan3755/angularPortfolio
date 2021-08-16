let token = ""
let userId = ""

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


   fetch(urlPostArticle,{method:'POST',body:formData,headers: {
    Authorization: "Bearer" + " " + token,
  },})
   .then((res)=>res.json())
   .then((res)=>{
       if(res.code!==200){
           console.log('probleme ajout')
       }else{
           console.log('no problemo')
       }
   })

})

/*get modif article*/

let urlGetarticleModif="http://localhost:3000/redaction/article/id/"
let articleModifPage=document.getElementById('articleModif')
boutonModifArticle.addEventListener('click',()=>{

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
    console.log('click article'+res[i]._id )
})

let blocParaImage=document.createElement('p')
blocParaImage.innerHTML=res[i].titre
blocParaImage.classList='paraModifPage'
blocImage.appendChild(blocParaImage)
articleModifPage.appendChild(blocImage)
}


          console.log(res)
      })

      console.log(userId)
})

