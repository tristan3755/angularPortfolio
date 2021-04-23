import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mokup',
  templateUrl: './mokup.component.html',
  styleUrls: ['./mokup.component.css']
})
export class MokupComponent implements OnInit {

  
titre='Responsive Design'

  constructor() { 
    setInterval(() => {
      this.titre='Code optimisé'
      console.log(this.titre)
    },8000 )
    setInterval(() => {
      this.titre='UX'
      console.log(this.titre)
    },11000 )
    setInterval(() => {
      this.titre='UI'
      console.log(this.titre)
    },15000 )
    setInterval(() => {
      this.titre='Responsive Design'
      console.log(this.titre)
    },20000 )
    
  }

  ngOnInit(): void {
  }

}
