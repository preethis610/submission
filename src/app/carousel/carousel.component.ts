import {
  Component, OnInit, AfterViewInit, Output, EventEmitter,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CarouselItemDirective } from '../carousel-item.directive';
import { CarouselItemElementDirective } from '../carousel-item-element.directive';
import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  style
} from "@angular/animations";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {
  @Output() changeCenterCard = new EventEmitter<number>();
  @ContentChildren(CarouselItemDirective) items: QueryList<
    CarouselItemDirective>;
  @ViewChildren(CarouselItemElementDirective, { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;
  @ViewChild("carousel") private carousel: ElementRef;
  @Input() timing = "500ms ease-in";
  @Input() totalVisibleCount;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;

  centerCard;
  constructor(private builder: AnimationBuilder) { }
  ngAfterViewInit() {

    this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;


  }
  nextOrPrev(event) {
    // let dragElementIndex = event.target.id ? event.target.id : event.target.parentElement ? event.target.parentElement.id : null;
    // let arrayEle = this.itemsElements.toArray();
    // let ele = arrayEle.filter((element, index) => element.nativeElement.innerText.split(/\n/).shift() === dragElementIndex);
    // console.log(arrayEle.filter((element, index) => element.nativeElement.innerText.split(/\n/).shift() === dragElementIndex));
    // console.log(ele[0].nativeElement.offsetLeft + ele[0].nativeElement.offsetWidth);
    if (event.offsetX > 0) {
      this.next(event);
    } else {
      this.prev(event);
    }
  }

  next(event) {
    this.changeCenterCard.emit(1);
    if ((this.items.length !== this.totalVisibleCount && this.currentSlide + 1 <= this.items.length - this.totalVisibleCount) ||
      (this.items.length === this.totalVisibleCount && this.currentSlide + 1 <= this.items.length)) {
      let arr = this.items.toArray();
      let first = arr.shift();
      arr = arr.concat([first]);
      this.items.reset(arr);
      this.currentSlide--;
      this.transitionCarousel(0);
    }
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    this.transitionCarousel(null);
  }
  transitionCarousel(time: any) {
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset, time);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }
  private buildAnimation(offset, time: any) {
    // console.log(offset);
    offset = offset + (this.currentSlide * 26);
    return this.builder.build([
      animate(time == null ? this.timing : 0,
        style({ transform: `translateX(${offset}px)` }))
    ]);
  }
  prev(event) {
    this.changeCenterCard.emit(-1);
    if (this.currentSlide == 0) {
      let arr = this.items.toArray();
      let last = arr.pop();
      arr = [last].concat(arr);
      this.items.reset(arr);
      this.currentSlide++;
      this.transitionCarousel(0);
    }

    this.currentSlide =
      (this.currentSlide - 1 + this.items.length) % this.items.length;
    this.transitionCarousel(null);
  }
}
