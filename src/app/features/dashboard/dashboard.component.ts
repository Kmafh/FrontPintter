import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ImageSliderComponent } from "../../shared/components/image-slider/image-slider.component";
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSidenavModule, MatIconModule, MatInputModule, MatFormFieldModule, ImageSliderComponent,  MatMenuModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;
}
