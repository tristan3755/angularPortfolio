const urlCategorie='https://mysterious-mesa-82638.herokuapp.com/redaction/categories/'
const architecture='Architecture'

let titre=""
let auteur=""
let idUserImage=""
let imageArticle=""
let text=""

let monGrid=document.getElementById('gridCategorie')

fetch(urlCategorie+architecture,{method:'GET',headers:{"Content-Type": "application/json; charset=UTF-8"}})
.then(res=>res.json())
.then(res=>{
console.log(res)    

for(let i in res){
let blocArticle=document.createElement('article')
blocArticle.classList='blocArticle'
blocArticle.style.backgroundImage='url('+res[i].imageArticle+')'

let blocTitre=document.createElement('p')
blocTitre.classList='titre'

blocTitre.innerHTML=res[i].titre 

let blocFiltre=document.createElement('div')

blocArticle.appendChild(blocFiltre)
blocFiltre.classList='blocFiltre'

blocArticle.appendChild(blocTitre)

monGrid.appendChild(blocArticle)

blocArticle.addEventListener('click',()=>{
    
titre=res[i].titre 
auteur=res[i].auteur 
idUserImage=res[i].idUserImage
imageArticle=res[i].imageArticle
text=res[i].text

console.log(titre,auteur,idUserImage,imageArticle,text)

let ficheArticle=document.createElement('article')
ficheArticle.classList='ficheArticle'
ficheArticle.style.display='flex'

let imageFiche=document.createElement('div')
imageFiche.classList='imageFiche'
imageFiche.style.backgroundImage='url('+imageArticle+')'

let voileFiche=document.createElement('div')
voileFiche.classList="voileFiche"

imageFiche.appendChild(voileFiche)

let titreFiche=document.createElement('p')
titreFiche.classList="titreFiche"
titreFiche.innerHTML=titre

imageFiche.appendChild(titreFiche)


let auteurFiche=document.createElement('p')
auteurFiche.classList="auteurFiche"
auteurFiche.innerHTML=auteur

imageFiche.appendChild(auteurFiche)


ficheArticle.appendChild(imageFiche)


let textFiche=document.createElement('p')
textFiche.classList="textFiche"
textFiche.innerHTML=text

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

monGrid.appendChild(ficheArticle)

})

}

})