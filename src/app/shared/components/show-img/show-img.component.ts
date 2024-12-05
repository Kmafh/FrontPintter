import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { BaseService } from '../../../core/services/base/base.service';
import { UserService } from '../../../core/services/users/users.service';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/user';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../../enviroments/environment';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommentsComponent } from "../comments/comments.component";
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

const endpoint: any = environment.baseUrl;
const url: any = `${endpoint}/obra`;
@Component({
  selector: 'app-show-img',
  standalone: true,
  imports: [MatButtonModule, CommentsComponent,CommonModule, MatMenuModule,RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './show-img.component.html',
  styleUrl: './show-img.component.scss'
})
export class ShowImgComponent implements OnInit{
  image:any
  userImage:any
  id:string = ""
  loginUser:boolean=false
  user: User | null = null;
  data:any = {}
  spinner:boolean=false;
  private userSubscription!: Subscription;
  
//  Utils

 constructor(
  public baseService: BaseService,
  private userService: UserService,
  private route: ActivatedRoute
) {
  this.route.paramMap.subscribe((params) => {
    this.id = params.get('id') || '';
    this.getImageById()
    // Aquí puedes hacer algo con el ID, como una llamada a un servicio para obtener datos
  });
}
ngOnInit() {
  // Suscribirse a los cambios de usuario
  this.userSubscription = this.userService.userChange.subscribe((user) => {
    this.user = user;
  });
  // Inicializar con el usuario almacenado en el servicio
  this.user = this.userService.user;
  this.data = {iid:this.id,uid: this.user?.uid}
  this.route.paramMap.subscribe((params) => {
    this.id = params.get('id') || '';
    this.getImageById()
    // Aquí puedes hacer algo con el ID, como una llamada a un servicio para obtener datos
  });
}
 
getImageById() {
  this.spinner = true
  const urlPoint = `${url}/obra/${this.id}`
  this.baseService.getItemsById(urlPoint).subscribe((resp:any) => {
    this.image = resp.dataSource.obra
    this.userImage = resp.dataSource.user
    if(this.user?.uid === this.userImage.uid)
      {
        this.loginUser = true
      }
  this.spinner = false

  })
}
}
