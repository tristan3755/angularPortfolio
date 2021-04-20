import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  menu=false

  constructor() { }

  ngOnInit(): void {
  }
getMenu(){
  this.menu=true
}
getMenuOff(){
  this.menu=false
}

}
