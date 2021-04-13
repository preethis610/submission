import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
@Output() nextClick = new EventEmitter<boolean>();
@Output() prevClick = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
next(){
  this.nextClick.emit(true);
}
prev(){
  this.prevClick.emit(true);
}
}
