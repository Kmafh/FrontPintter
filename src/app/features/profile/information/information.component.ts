import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from '../../../core/utils/utils';
import { EditUserComponent } from '../../../shared/components/dialog/edit-user/edit-user.component';
import { UserService } from '../../../core/services/users/users.service';
import { BaseService } from '../../../core/services/base/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../core/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [MatListModule,CommonModule,MatIconModule, MatButtonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent implements OnInit{
  @Input() user:any 
  userFormat:any
  userLogin: User | null = null;
  userProfile: boolean = false;
  private userSubscription!: Subscription;
  constructor(
    public baseService: BaseService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  
  ) {
    
  }
  ngOnInit(): void {
    // Suscribirse a los cambios de usuario
  this.userSubscription = this.userService.userChange.subscribe((user) => {
    this.userLogin = user;
  });

  if(this.userLogin?.uid === this.user.uid)
  {
    this.userProfile = true
  }
  // Inicializar con el usuario almacenado en el servicio
  this.user = this.userService.user;
    this.userFormat = { ...this.user };
    this.userFormat.role = this.user.role === 'USER_ROLE'?'Usuario':'Admin';
    this.userFormat.createAt = Utils.transform(this.user.createAt);
    this.userFormat.sex = this.user.sex === 'man'?'Hombre':this.user.sex === 'woman'?'Mujer':'Personalizado';
  }

 readonly dialog = inject(MatDialog);

// Variable para almacenar el índice del botón activo
activeButton: number = 0;

// Función para manejar el clic en los botones
setActiveButton(index: number): void {
  this.activeButton = index;
}

openDialog(group:any): void {
  const data:any = {group, value: this.user}
  const dialogRef = this.dialog.open(EditUserComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}
ngOnChanges(changes: any): void {
  if (changes['user'].currentValue ) {
    this.userFormat = {...changes['user'].currentValue};
    this.userFormat.role = this.userFormat.role === 'USER_ROLE'?'Usuario':'Admin';
    this.userFormat.createAt = Utils.transform(this.userFormat.createAt);
    this.userFormat.sex = this.userFormat.sex === 'man'?'Hombre':this.userFormat.sex === 'woman'?'Mujer':'Personalizado';
  }
}
}
