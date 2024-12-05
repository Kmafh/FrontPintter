import { CommonModule } from '@angular/common';
import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { InformationComponent } from '../profile/information/information.component';
import { BaseService } from '../../core/services/base/base.service';
import { UserService } from '../../core/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '../../core/models/user';
import { MatIconModule } from '@angular/material/icon';
import { GaleryComponent } from "../../shared/components/galery/galery.component";
import { ObraDialogComponent } from '../../shared/components/dialog/obra-dialog/obra-dialog.component';
import { environment } from '../../../enviroments/environment';
import { Utils } from '../../core/utils/utils';
const endpoint: any = environment.baseUrl;
const url: any = `${endpoint}/obra`;
@Component({
  selector: 'app-obras',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatMenuModule, MatTabsModule, CommonModule, InformationComponent, MatIconModule, GaleryComponent],
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.scss'
})
export class ObrasComponent implements OnInit{

  user: User | null = null;
  private userSubscription!: Subscription;
 readonly dialog = inject(MatDialog);
  dataSource:any = []
//  Utils
  // Variable para almacenar el índice del botón activo
 activeButton: number = 0;

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
  this.getObras()
}


//  Utils
 // Función para manejar el clic en los botones
 setActiveButton(index: number): void {
   this.activeButton = index;
 }

 getObras() {
  const urlPoint = `${url}/${this.user?.uid}`
  this.baseService.getItemsByUid(urlPoint).subscribe((resp:any) => {
    this.dataSource = resp.obra
  })
 }
 openDialog(): void {
  const dialogRef = this.dialog.open(ObraDialogComponent, {
    maxWidth:"100vh",
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getObras()
  });
}
}
