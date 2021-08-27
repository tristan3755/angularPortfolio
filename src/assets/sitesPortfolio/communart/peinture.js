const urlCategorie='http://localhost:3000/redaction/categories/'
const peinture='Peinture'

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

let dateArticle= res[i].createdAt.split('T')
console.log(dateArticle)

let date1=dateArticle[0]
console.log(date1)

let date2=date1.split('-')
console.log(date2)

let dateFinie=date2[2]+'/'+date2[1]+'/'+date2[0]

blocTitre.innerHTML=res[i].titre + ',article rédigé le : ' + dateFinie

let blocFiltre=document.createElement('div')

blocArticle.appendChild(blocFiltre)
blocFiltre.classList='blocFiltre'

blocArticle.appendChild(blocTitre)

monGrid.appendChild(blocArticle)

}

})