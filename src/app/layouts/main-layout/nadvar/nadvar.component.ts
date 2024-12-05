import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {  Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-nadvar',
  standalone: true,
  imports: [CommonModule,MatButtonModule,  MatIconModule,MatFormFieldModule, MatInputModule, MatIconModule,  MatMenuModule, MatListModule,RouterModule],
  templateUrl: './nadvar.component.html',
  styleUrl: './nadvar.component.scss'
})
export class NadvarComponent {
  color=false

  constructor(private router:Router) {

  }
  closedSession() {
    sessionStorage.clear();
    this.router.navigate([''])
  }
}
