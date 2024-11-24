import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [MatListModule, MatButtonModule, RouterModule, MatIconModule, MatTooltipModule],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

}
