import { Component, inject } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InformationComponent } from '../../../../features/profile/information/information.component';
import { FormsUser } from '../../../../features/profile/models/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-user-information',
  standalone: true,
  imports: [DynamicFormComponent,MatDividerModule, MatIconModule, MatButtonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './edit-user-information.component.html',
  styleUrl: './edit-user-information.component.scss'
})
export class EditUserInformationComponent {
  dynamicGroup: any = 0;
  dynamicForm: any;
  
  readonly dialogRef = inject(MatDialogRef<InformationComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  ngOnInit(): void {
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
    controls['name']?.setValue(this.data.value.name);
    controls['name']?.setValue(this.data.value.name);
  }
  ifValueChange(form: FormGroup) {
    const controls = form.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
