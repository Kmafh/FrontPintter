import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();
@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss',
})
export class ImageSliderComponent implements OnInit {
  swiperElement = signal<SwiperContainer | null>(null);
  @Input() data:any = []
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const swiperElemContructor = document.querySelector('swiper-container');
      const swiperOptions: SwiperOptions = {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: true,
        pagination: { clickable: true },
        autoplay: { delay: 3000 },
        loop: true,
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
        }
      };
      Object.assign(swiperElemContructor!, swiperOptions);
      this.swiperElement.set(swiperElemContructor as SwiperContainer);
      this.swiperElement()?.initialize();
    }
  }
  ngOnChanges(changes: any): void {
    if (changes['data'].currentValue && changes['data'].previousValue) {
      this.data = {...changes['data'].currentValue};
    }
  }
  url(img:any) {
    if(img.tipe) {
      this.router.navigate([`/obra/${img.id}`])
    } else if(img.email) {
      this.router.navigate([`/profile/${img.uid}`])

    }
  }
}
