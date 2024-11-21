import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [MatListModule,CommonModule,MatIconModule, MatButtonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {

  @Input() user:any 
// Variable para almacenar el índice del botón activo
activeButton: number = 0;

// Función para manejar el clic en los botones
setActiveButton(index: number): void {
  this.activeButton = index;
}
}
