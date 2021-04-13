import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items = [
    { id: 1, title: 'Mobile internet', thumbnail: '../../assets/images/images_thumb.png', pic: '../../assets/images/images.png' },
    { id: 2, title: 'Home internet', thumbnail: '../../assets/images/images_thumb.png', pic: '../../assets/images/images.png' },
    { id: 3, title: 'Get a device', thumbnail: '../../assets/images/images_thumb.png', pic: '../../assets/images/images.png', help: 'START HERE >' },
    { id: 4, title: 'Add a phone-line', thumbnail: '../../assets/images/images_thumb.png', pic: '../../assets/images/images.png' },
    { id: 5, title: 'Upgrade', thumbnail: '../../assets/images/images_thumb.png', pic: '../../assets/images/images.png' },
    { id: 6, title: 'Support', thumbnail: '../../assets/images/images_thumb.png', pic: '../../assets/images/images.png' },
    { id: 7, title: 'Contact', thumbnail: '../../assets/images/images_thumb.png', pic: '../../assets/images/images.png' }

  ];
  totalVisibleCount = 5;
  centerCard;
  ngOnInit() {
    this.centerCard = this.totalVisibleCount !== 0 ? Math.round(this.totalVisibleCount / 2) : 0;
  }
  centerCardUpdate(event) {
    if (event === 1 && (this.centerCard + event <= this.items.length)) {
      this.centerCard = this.centerCard + event;
    } else if (event === -1 && this.centerCard + event >= 1) {
      this.centerCard = this.centerCard + event;
    } else {
      this.centerCard = event === 1 ? 1 : this.items.length;
    }
  }
}
