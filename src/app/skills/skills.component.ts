import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {


  image1:any='../../assets/images/html5.jpg'
image2:any='../../assets/images/css.jpg'
image3:any='../../assets/images/js.png'
image4:any='../../assets/images/Angular.png'
image10:any='../../assets/images/ai.png'
image5:any='../../assets/images/blender_logo.png'
image6:any='../../assets/images/figma.png'
image7:any='../../assets/images/SVG.jpg'
image8:any='../../assets/images/mysql.png'
image9:any='../../assets/images/php.jpg'

  constructor() { }

  ngOnInit(): void {
  }

}
