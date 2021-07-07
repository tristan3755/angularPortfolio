import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
image1:any='../../assets/images/community.jpg'
image2:any='../../assets/images/communart.jpg'
image3:any='../../assets/images/metis.jpg'
image4:any='../../assets/images/the.jpg'
video:any='../../assets/images/sun.mp4'
image5:any='../../assets/images/meteo.jpg'
image6:any='../../assets/images/solaris.jpg'
  constructor() { }

  ngOnInit(): void {
  }

}
