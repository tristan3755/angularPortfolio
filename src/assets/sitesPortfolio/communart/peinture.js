const urlCategorie='http://localhost:3000/redaction/categories/'
const peinture='Peinture'

let titre=""
let auteur=""
let idUserImage=""
let imageArticle=""
let text=""

let monGrid=document.getElementById('gridCategorie')

fetch(urlCategorie+peinture,{method:'GET',headers:{"Content-Type": "application/json; charset=UTF-8"}})
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

})

}

})