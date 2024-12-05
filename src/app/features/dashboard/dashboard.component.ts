import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ImageSliderComponent } from "../../shared/components/image-slider/image-slider.component";
import { MatMenuModule } from '@angular/material/menu';
import { SearchDialogComponent } from '../../shared/components/dialog/search-dialog/search-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from '../../core/services/base/base.service';
import { UserService } from '../../core/services/users/users.service';
import { map, Subscription } from 'rxjs';
import { User } from '../../core/models/user';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../enviroments/environment';
import { CommonModule } from '@angular/common';
const endpoint: any = environment.baseUrl;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSidenavModule, MatIconModule, MatInputModule, MatFormFieldModule, ImageSliderComponent,  MatMenuModule,FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  user: User | null = null;
  private userSubscription!: Subscription;
  
//  Utils
  // Variable para almacenar el índice del botón activo
 activeButton: number = 0;
 searchTerm: string = ''; // Término de búsqueda
 filter: string = '';

 spinner: boolean = false;
 filteredItems: any = [];
  
 dataSource!: MatTableDataSource<any>;
 readonly dialog = inject(MatDialog);

 constructor(
  public baseService: BaseService,
  private userService: UserService,
) {}

 ngOnInit() {
  // Suscribirse a los cambios de usuario
  this.userSubscription = this.userService.userChange.subscribe((user) => {
    this.user = user;
  });
  // Inicializar con el usuario almacenado en el servicio
  this.user = this.userService.user;
}
  showFiller = false;

  searchItem(tipe:any) {
    let url;
    this.spinner = true
    switch (tipe) {
      case 'user':
        url = `${endpoint}/user`;

         this.filterDataUserSource(url);
        break;
      case 'obra':
        url = `${endpoint}/obra`;
    this.filterDataSource(url)
        break;
      case 'exposition':
        url = `${endpoint}/obra`;
        this.filterDataSource(url)
        break;
    }

  }

  filterDataSource(url:string): void {
    this.baseService
      .getItems(url)
      .pipe(
        map((resp: any) =>
          resp.dataSource.filter(
            (item: any) =>
              item.name.toLowerCase().includes(this.filter.toLowerCase())
          )
        )
      )
      .subscribe((filteredItems) => {
        console.log(filteredItems);
        this.filteredItems = filteredItems; // Guardar los resultados filtrados
    this.dataSource = new MatTableDataSource(filteredItems);
        setTimeout(() => {
          this.spinner=false
        }, 1000);
      });
  }
  filterDataUserSource(url:string): void {
    this.baseService
      .getItems(url)
      .pipe(
        map((resp: any) =>
          resp.usuarios.filter(
            (item: any) =>
              item.name.toLowerCase().includes(this.filter.toLowerCase())
          )
        )
      )
      .subscribe((filteredItems) => {
        console.log(filteredItems);
        this.filteredItems = filteredItems; // Guardar los resultados filtrados
    this.dataSource = new MatTableDataSource(filteredItems);
        setTimeout(() => {
          this.spinner=false
        }, 1000);
      });
  }
  openDialog(tipe:any): void {
    const data:any = {tipe, value: this.searchTerm}
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      data,
      width:'200vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
