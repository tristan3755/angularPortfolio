import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  ville=false

  constructor() { }

  ngOnInit(): void {
  }
getVille(){
    this.ville=true
  }
  getVilleOff(){
    this.ville=false

  }
}
