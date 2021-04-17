import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  image="../assets/images/tristan.png"

  constructor() { }

  ngOnInit(): void {
  }

  getImage(){
    return this.image
  }
  
}
