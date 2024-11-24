import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.scss',
})
export class GaleryComponent implements OnChanges {
  @Input() dataSource: any = [];
  allImages: string[] = []; // Lista completa de imágenes
  displayedImages: any[] = []; // Imágenes visibles actualmente
  pageSize: number = 10; // Tamaño del lote de carga
  currentPage: number = 0; // Página actual para la carga
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  ngOnInit(): void {
    // Simular lista de imágenes (puedes sustituirlo por un fetch desde una API)
    this.allImages = this.dataSource;
    // this.loadMoreImages(); // Cargar las primeras imágenes
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.allImages = changes['dataSource']?.currentValue;
    this.loadMoreImages();
  }
  // Función para cargar más imágenes
  loadMoreImages(): void {
    if (this.allImages.length > 14) {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const newImages = this.allImages.slice(startIndex, endIndex);

      this.displayedImages = [...this.displayedImages, ...newImages];
      this.currentPage++;
    } else {
      this.displayedImages = [...this.allImages];

    }
  }

  // Detectar si el scroll está cerca del final
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.scrollAnchor) {
      const { bottom } =
        this.scrollAnchor.nativeElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (bottom <= viewportHeight) {
        this.loadMoreImages(); // Cargar más imágenes si llegamos al final
      }
    }
  }
}
