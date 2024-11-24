import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from '../../../../features/profile/profile.component';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
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
import { FormsObra } from '../../../../features/obras/models/forms';

import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
const endpoint: any = environment.baseUrl;
const url: any = `${endpoint}/obra`;

@Component({
  selector: 'app-obra-dialog',
  standalone: true,
  imports: [
    DynamicFormComponent,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './obra-dialog.component.html',
  styleUrl: './obra-dialog.component.scss',
})
export class ObraDialogComponent {
  dynamicGroup: any = 0;
  dynamicForm: any;

  readonly dialogRef = inject(MatDialogRef<ProfileComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  spinner: boolean = false;
  upImg = 0;
  file: any = '';
  uploadedImageUrl: string | null = null;
  constructor(
    public baseService: BaseService,
    public userService: UserService,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.dynamicGroup = FormsObra.updateGroup;
    const group = this.data?.group;
    switch (group) {
      case 'pro':
        this.dynamicGroup = FormsUser.updateProGroup;
        break;
      case 'city':
        this.dynamicGroup = FormsUser.updateCityGroup;
        break;
      case 'study':
        this.dynamicGroup = FormsUser.updateStudyGroup;
        break;
      case 'curs':
        this.dynamicGroup = FormsUser.updateCursGroup;
        break;
      case 'job':
        this.dynamicGroup = FormsUser.updateJobGroup;
        break;
    }
  }
  onFormGroupChange(formGroup: FormGroup) {
    this.dynamicForm = formGroup;
    this.onFormCreated(this.dynamicForm);
  }
  onFormCreated = (form: any) => {
    this.ifValueChange(form);
    this.setValuesDefault(form);
    this.setValidatorFormsStatic(form);
  };
  setValidatorFormsStatic(
    form: FormGroup,
    credit: boolean = false,
    mov: boolean = false
  ) {
    const controls = form.controls;
  }
  setValuesDefault(form: FormGroup) {
    const controls = form.controls;
    controls['name']?.setValue(this.data?.value.name);
    controls['lastname']?.setValue(this.data?.value.lastname);
    controls['createAt']?.setValue(new Date(this.data?.value.createAt));
    controls['sex']?.setValue(this.data?.value.sex);
    controls['pro']?.setValue(
      this.data?.value.pro !== 'Oculto' ? this.data?.value.pro : ''
    );
    controls['city']?.setValue(
      this.data?.value.city !== 'Oculto' ? this.data?.value.city : ''
    );
    controls['job']?.setValue(
      this.data?.value.job !== 'Oculto' ? this.data?.value.job : ''
    );
    controls['study']?.setValue(
      this.data?.value.study !== 'Oculto' ? this.data?.value.study : ''
    );
    controls['curs']?.setValue(
      this.data?.value.curs !== 'Oculto' ? this.data?.value.curs : ''
    );
  }
  ifValueChange(form: FormGroup) {
    const controls = form.controls;
  }
  onClick(form: FormGroup) {
    this.spinner = true;
    const controls = form.controls;
    this.onSubmit();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(
      BottomSheetOverviewExampleSheet
    );

    // Captura el valor devuelto cuando se cierre el Bottom Sheet
    bottomSheetRef.afterDismissed().subscribe((result) => {
      this.upImg = result;
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

  // Enviar el archivo al servidor
  onSubmit() {
    if (!this.file) {
      return;
    }
    if (this.dynamicForm.valid) {
      let obra = {...this.dynamicForm.value};
      const formData = new FormData();
      formData.append('image', this.file);

      // Cambiar 'http://localhost:3000/api/upload' por la URL de tu servidor
      this.http
        .post<{ url: string }>('http://localhost:3000/api/upload', formData)
        .subscribe(
          (response) => {
            this.uploadedImageUrl = response.url;
            obra.img = this.uploadedImageUrl
            obra.uid = this.userService.user?.uid
            obra.active = true
            obra.createAt = new Date()
            obra.like = 0
            obra.price = 0
            console.log('Imagen subida con éxito:', response.url);
            Utils.postItem(url,obra,this._snackBar,this.baseService).subscribe((resp:any) => {
            this.spinner = false;
              this.onNoClick()
            })
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
            this.spinner = false;
          }
        );
    }
  }
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
  standalone: true,
  imports: [MatListModule],
})
export class BottomSheetOverviewExampleSheet {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewExampleSheet>>(
      MatBottomSheetRef
    );

  openLink(event: any): void {
    this._bottomSheetRef.dismiss(event);
    event.preventDefault();
    // Aquí puedes definir el valor a devolver
    const returnValue = 'Valor devuelto';
    this._bottomSheetRef.dismiss(returnValue); // Dismiss con un valor
  }
}
