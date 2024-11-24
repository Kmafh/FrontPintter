import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from '../../../../features/profile/profile.component';
import { DynamicFormComponent } from "../../dynamic-form/dynamic-form.component";
import { FormsUser } from '../../../../features/profile/models/forms';
import { FormGroup } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Utils } from '../../../utils/utils';
import { environment } from '../../../../../enviroments/environment';
import { BaseService } from '../../../../core/services/base/base.service';
import { UserService } from '../../../../core/services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
const endpoint: any = environment.baseUrl;
const url: any = `${endpoint}/user`;

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [DynamicFormComponent,MatDividerModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{
  dynamicGroup: any = 0;
  dynamicForm: any;
  
  readonly dialogRef = inject(MatDialogRef<ProfileComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);


  spinner:boolean = false
  constructor(
    public baseService: BaseService,
    public userService: UserService,
    private _snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.dynamicGroup = FormsUser.updateGroup
    const group = this.data.group;
    switch(group){
      case "pro":
    this.dynamicGroup = FormsUser.updateProGroup
    break;
      case "city": 
    this.dynamicGroup = FormsUser.updateCityGroup
    break;
      case "study": 
    this.dynamicGroup = FormsUser.updateStudyGroup
    break;
      case "curs": 
    this.dynamicGroup = FormsUser.updateCursGroup
    break;
      case "job": 
    this.dynamicGroup = FormsUser.updateJobGroup
    break;
    }
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
    controls['name']?.setValue(this.data.value.name);
    controls['lastname']?.setValue(this.data.value.lastname);
    controls['createAt']?.setValue(new Date(this.data.value.createAt));
    controls['sex']?.setValue(this.data.value.sex);
    controls['pro']?.setValue(this.data.value.pro!=='Oculto'?this.data.value.pro: '');
    controls['city']?.setValue(this.data.value.city!=='Oculto'?this.data.value.city: '');
    controls['job']?.setValue(this.data.value.job!=='Oculto'?this.data.value.job: '');
    controls['study']?.setValue(this.data.value.study!=='Oculto'?this.data.value.study: '');
    controls['curs']?.setValue(this.data.value.curs!=='Oculto'?this.data.value.curs: '');
  }
  ifValueChange(form: FormGroup) {
    const controls = form.controls;
  }
  onClick(
    form: FormGroup,
  ) {
    this.spinner = true
    const controls = form.controls;
    let user = this.data.value;
    const urlPoint = `${url}/${user.uid}`

    delete user.password;
    user.name = controls["name"]?.value;
    user.lastname = controls["lastname"]?.value;
    user.email = controls["email"]?.value;
    user.createAt = controls["createAt"]?.value;
    user.sex = controls["sex"]?.value;
    user.job = controls["job"]?.value;
    user.city = controls["city"]?.value;
    user.curs = controls["curs"]?.value;
    user.pro = controls["pro"]?.value;
    user.study = controls["study"]?.value;
    Utils.puttItem(urlPoint,user,this._snackBar,this.baseService).subscribe((resp:any) => {
      this.userService.user = resp.user
      this.spinner = false

    })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
