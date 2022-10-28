import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = [
    { 'src': '../../assets/images/image-1.png' },
    { 'src': '../../assets/images/image-2.png' },
    { 'src': '../../assets/images/image-9.png' },
    { 'src': '../../assets/images/image-10.png' },
    { 'src': '../../assets/images/image-5.png' },
    { 'src': '../../assets/images/image-3.png' },
    { 'src': '../../assets/images/image-4.png' },
    { 'src': '../../assets/images/image-6.png' },
    { 'src': '../../assets/images/image-7.png' },
    { 'src': '../../assets/images/image-8.png' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
