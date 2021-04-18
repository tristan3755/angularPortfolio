import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mokup',
  templateUrl: './mokup.component.html',
  styleUrls: ['./mokup.component.css']
})
export class MokupComponent implements OnInit {

  transition:any="ease 2s"

  titre='Responsive Design'
  constructor() { 
    setInterval(() => {
      this.titre='Code optimisé'
    },3000 )
    setInterval(() => {
      this.titre='UX'
    },6000 )
    setInterval(() => {
      this.titre='UI'
    },9000 )
    setInterval(() => {
      this.titre='Responsive Design'
    },12000 )
  }

  ngOnInit(): void {
  }

}
