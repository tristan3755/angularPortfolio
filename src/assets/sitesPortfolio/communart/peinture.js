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

monGrid.appendChild(blocArticle)

}

})