console.log('salut')
console.log(Vue)

const app=new Vue({
el:'#app',
data:{
toggle:false,
villeMeteo:'',
},
methods:{
changeToggle(){
this.toggle=!this.toggle
console.log(this.toggle)
return this.toggle
},
getAlert(){
console.log(this.villeMeteo)
let url="https://api.openweathermap.org/data/2.5/weather?q="+this.villeMeteo+"&appid=28da2799b73f06513b062e2b6178e72d&units=metric"
console.log(url)
let divImage=document.getElementById('image')
divImage.style.backgroundImage='url("")'
document.querySelector('.pMeteo').innerHTML=''
document.querySelector('.pTemp').innerHTML=''
fetch(url)
.then(res=>res.json())
.then(res=>{
console.log(res)
console.log(res.weather[0].icon)
divImage.style.backgroundImage='url('+"https://openweathermap.org/img/w/"+res.weather[0].icon+".png"+')'
document.querySelector('.pMeteo').innerHTML=res.weather[0].main +" , "+ res.weather[0].description
document.querySelector('.pTemp').innerHTML=res.main.temp+"°c"
})
.catch(error=>{
    console.log(error)
    document.querySelector('.pMeteo').innerHTML="Nous ne trouvons pas votre ville"
})
}}
})


