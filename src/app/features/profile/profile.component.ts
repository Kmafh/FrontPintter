import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import { InformationComponent } from './information/information.component';
import { User } from '../../core/models/user';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from '../../core/services/base/base.service';
import { UserService } from '../../core/services/users/users.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from 'express';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../../shared/components/dialog/edit-user/edit-user.component';
import { FormsUser } from './models/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSidenavModule, MatIconModule, MatInputModule, MatFormFieldModule, MatMenuModule, MatTabsModule,CommonModule, InformationComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  user: User | null = null;
  private userSubscription!: Subscription;
  
//  Utils
  // Variable para almacenar el índice del botón activo
 activeButton: number = 0;
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



//  Utils
 // Función para manejar el clic en los botones
 setActiveButton(index: number): void {
   this.activeButton = index;
 }

  openDialog(): void {
    const data:any = {group:'update', value: this.user}
    const dialogRef = this.dialog.open(EditUserComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
