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
import { BaseService } from '../../core/services/base/base.service';
import { UserService } from '../../core/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../../shared/components/dialog/edit-user/edit-user.component';
import { environment } from '../../../enviroments/environment';
import { Utils } from '../../core/utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
const endpoint: any = environment.baseUrl;
const url: any = `${endpoint}/user`;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSidenavModule, MatIconModule, MatInputModule, MatFormFieldModule, MatMenuModule, MatTabsModule,CommonModule, InformationComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  user: User | null = null;
  userProfile: User | null = null;
  private userSubscription!: Subscription;
  id:string = ""
  
//  Utils
  // Variable para almacenar el índice del botón activo
 activeButton: number = 0;
 upImg = 0;
 file: any = '';
 spinner:boolean = false
 userIsLogin:boolean = true
 uploadedImageUrl: string | null = null;

 readonly dialog = inject(MatDialog);

 constructor(
  public baseService: BaseService,
  private userService: UserService,
  private _snackBar: MatSnackBar,
  private http: HttpClient,
  private route: ActivatedRoute

) {
  this.route.paramMap.subscribe((params) => {
    this.id = params.get('uid') || '';
    // Aquí puedes hacer algo con el ID, como una llamada a un servicio para obtener datos
  });
}

 ngOnInit() {
  this.spinner = true

  // Suscribirse a los cambios de usuario
  this.userSubscription = this.userService.userChange.subscribe((user) => {
    this.user = user;
  });
  // Inicializar con el usuario almacenado en el servicio
  this.user = this.userService.user;
  if(this.id === this.user?.uid || this.id === '') {
    this.userProfile = this.user
    this.spinner = false
    this.userIsLogin=true
  } else {
    this.userService.getUserByUID(this.id).subscribe((resp:any) => {
      this.userProfile = resp.user
      this.spinner = false
    this.userIsLogin=false

    })
  }
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

  imagePreview: string | null = null; // Variable para almacenar la URL de la imagen

  triggerFileInput(event: MouseEvent): void {
    event.stopPropagation();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string; // Almacena la URL de la imagen
      };

      reader.readAsDataURL(this.file); // Lee el archivo como Data URL
    }
  }

  changeImg() {
    if (!this.file) {
      return;
    }
    this.spinner = true
    let user:any = this.user;
    const urlPoint = `${url}/${user?.uid}`;
    const formData = new FormData();
    formData.append('image', this.file);

    // Cambiar 'http://localhost:3000/api/upload' por la URL de tu servidor
    this.http
      .post<{ url: string }>('http://localhost:3000/api/upload', formData)
      .subscribe(
        (response) => {
          let urlPoint = url+"/"+user.uid
          this.uploadedImageUrl = response.url;
          user.img = this.uploadedImageUrl
          console.log('Imagen subida con éxito:', response.url);
          Utils.puttItem(urlPoint,user,this._snackBar,this.baseService).subscribe((resp:any) => {
          this.spinner = false;
          this.imagePreview = null
          })
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
          this.spinner = false;
        }
      );
  }
  
  
}
