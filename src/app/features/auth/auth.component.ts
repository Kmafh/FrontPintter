import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { FormsAuth } from './models/forms';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { environment } from '../../../enviroments/environment';
import { UserService } from '../../core/services/users/users.service';
import { Utils } from '../../core/utils/utils';
import { BaseService } from '../../core/services/base/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { User } from '../../core/models/user';
const endpoint: any = environment.baseUrl;

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [DynamicFormComponent,MatButtonModule,MatIconModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit{
  
  dynamicGroup: any;
  dynamicForm: any;
  page:any = 'login'
  spinner:boolean = false
  constructor(public baseService: BaseService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,) {

  }
  ngOnInit(): void {
    this.dynamicGroup=FormsAuth.loginGroup
  }
  
  onFormGroupChange(formGroup: FormGroup) {
    this.dynamicForm = formGroup;
    this.onFormCreated(this.dynamicForm);
  }
  onFormCreated = (form: any,) => {
    this.ifValueChange(form);
    this.setValuesDefault(form,);
    this.setValidatorFormsStatic(form);
  };
  setValidatorFormsStatic(
    form: FormGroup,
    credit: boolean = false,
    mov: boolean = false
  ) {
    const controls = form.controls;
  }
  setValuesDefault(
    form: FormGroup,
  ) {
    const controls = form.controls;
  }
  ifValueChange(form: FormGroup) {
    const controls = form.controls;
  }


  //Utils
  setPage(page:string) {
    this.page = page
    if(page==='register') {
      this.dynamicGroup=FormsAuth.registerGroup
    } else {
      this.dynamicGroup=FormsAuth.loginGroup
    }
    this.onFormGroupChange(this.dynamicGroup)

  }
  login() {
    let loginUser: any;
    const url: string = `${endpoint}/users`;

    if (this.dynamicForm.valid) {
      loginUser = this.dynamicForm.value;
      this.userService.login(loginUser).subscribe(
        (resp: any) => {
          Utils.openSnackBar(this._snackBar, 'Bienvenid@');
          this.router.navigate(['/profile']);
        },
        (error) => {
          Utils.openSnackBar(this._snackBar, error);
        }
      );
    }
  }
  register() {
    let registerUser: any;
    const url: string = `${endpoint}/login/sendMail`;
    this.spinner = true;
    
    if (this.dynamicForm.valid) {
      registerUser = this.dynamicForm.value;
      registerUser.img = '1'
      Utils.postItem(
        url,
        registerUser,
        this._snackBar,
        this.baseService
      ).subscribe({
        next: (msg: any) => {
          Utils.openSnackBarManual(this._snackBar, msg.msg);
          this.page='login';
          this.ngOnInit()
          this.spinner = false;
          

        },
        error: (err) => {
          Utils.openSnackBarManual(this._snackBar, err.error.msg);
          this.spinner = false;
        }
      });
    }
  }
}
