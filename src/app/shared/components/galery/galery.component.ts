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
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
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
    RouterModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,MatCardModule
  ],
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss'],
})
export class GaleryComponent implements OnChanges {
  @Input() dataSource: any = [];
  allImages: any[] = []; // Lista completa de imágenes
  displayedImages: any[] = []; // Imágenes visibles actualmente
  pageSize: number = 10; // Tamaño del lote de carga
  currentPage: number = 0; // Página actual para la carga
  searchTerm: string = ''; // Término de búsqueda
  filter:boolean=false
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  ngOnInit(): void {
    this.allImages = this.dataSource;
    this.loadMoreImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.allImages = changes['dataSource'].currentValue;
      this.filterImages();
    }
  }

  // Método para cargar más imágenes
  loadMoreImages(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const newImages = this.allImages.slice(startIndex, endIndex);
    this.displayedImages = [...this.displayedImages, ...newImages];
    this.currentPage++;
  }

  // Detectar si el scroll está cerca del final
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.scrollAnchor) {
      const { bottom } =
        this.scrollAnchor.nativeElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (bottom <= viewportHeight) {
        this.loadMoreImages();
      }
    }
  }

  // Método para filtrar imágenes según el término de búsqueda
  filterImages(): void {
    const filteredImages = this.allImages.filter((image) =>
      image.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.displayedImages = filteredImages.slice(0, this.pageSize); // Limita a las primeras imágenes
    this.currentPage = 1; // Reinicia la paginación
  }
}
