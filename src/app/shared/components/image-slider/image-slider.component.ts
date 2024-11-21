import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  signal,
} from '@angular/core';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();
@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss',
})
export class ImageSliderComponent implements OnInit {
  swiperElement = signal<SwiperContainer | null>(null);
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
  
}
