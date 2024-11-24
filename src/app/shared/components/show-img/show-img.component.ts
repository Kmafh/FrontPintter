import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../core/services/base/base.service';
import { UserService } from '../../../core/services/users/users.service';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/user';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../enviroments/environment';
const endpoint: any = environment.baseUrl;
const url: any = `${endpoint}/obra`;
@Component({
  selector: 'app-show-img',
  standalone: true,
  imports: [],
  templateUrl: './show-img.component.html',
  styleUrl: './show-img.component.scss'
})
export class ShowImgComponent implements OnInit{
  image:any
  id:string = ""
  user: User | null = null;
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
  this.route.paramMap.subscribe((params) => {
    this.id = params.get('id') || '';
    this.getImageById()
    // Aquí puedes hacer algo con el ID, como una llamada a un servicio para obtener datos
  });
}
 
getImageById() {
  const urlPoint = `${url}/${this.id}`
  this.baseService.getItemsById(urlPoint).subscribe((resp:any) => {
    this.image = resp.obra
  })
}

}
