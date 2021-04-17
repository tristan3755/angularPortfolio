import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mokup',
  templateUrl: './mokup.component.html',
  styleUrls: ['./mokup.component.css']
})
export class MokupComponent implements OnInit {

  image='../assets/images/mobile.jpg'
  image2='../assets/images/ordi.jpg'
 mobile:any
 valeur=window.scrollY
 
  constructor() { }

  ngOnInit(): void {
  }

  getImageMobile(){
    return this.image
  }
  getImageOrdi(){
    return this.image2
  }

 parralax1(){
   
   this.mobile.style.top= this.valeur*1+"px"
 }
}
