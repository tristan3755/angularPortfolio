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
        let blocErreur=document.createElement('p')
        blocErreur.innerHTML='erreur d\'identifiants ou de mot de passe'
        blocErreur.style.position='absolute'
        blocErreur.style.bottom="10px"
        blocErreur.style.color='#893142'

        let boutonConnexionHeader=document.querySelector('.boutonConnexion')
        let boutonInscriptionHeader=document.querySelector('.boutonInscription')
        let boutonDeco=document.querySelector('.deco')
        let bontonInsMobile=document.querySelector('#menuMobile div:nth-child(1)')
        let bontonCoMobile=document.querySelector('#menuMobile div:nth-child(2)')

boutonDeco.addEventListener('click',()=>{
    window.location.reload()
})

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
        }else if(res.code==401){ 
            blocErreur.style.display='flex'
        }
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

