import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormData } from '../../../core/interfaces';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu'
import {MatBadgeModule} from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    NgFor,
    NgIf,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTooltipModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Cambiar idioma a español
  ],
})
export class DynamicFormComponent {
  @Input() formData!: FormData;
  @Input() title: string = 'title';
  formGroup!: FormGroup ;
  @Output() formGroupChange = new EventEmitter<FormGroup>(); 
  hide=true
  constructor(private fb: FormBuilder) {
  this.formGroup = this.fb.group({});

  }

  ngOnInit() {
    this.formData.data.forEach((field) => {
      if (field.name) {
        const value = field.value || ''; 
        const disabled = field.disabled || false;
        const validators = field.required ? [Validators.required] : [];
  
        // Añadir el control al formGroup
        this.formGroup.addControl(
          field.name,
          this.fb.control({ value: value, disabled: disabled }, validators)
        );
  
        // Configurar visibilidad condicional si existe `showWen`
        if (field.showWen) {
          const controlToWatch = this.formGroup.get(field.showWen.name!);
          controlToWatch?.valueChanges.subscribe((value) => {
            if (Array.isArray(field.selectionValueShowWen)) {
              // Mostrar si el valor actual está en `selectionValueShowWen`
              field.hidden = !field.selectionValueShowWen.includes(value);
            } else {
              // Mostrar si tiene cualquier valor distinto de null o undefined
              field.hidden = value == null || value === '';
            }
          });
  
          // Condición inicial
          if (Array.isArray(field.selectionValueShowWen)) {
            field.hidden = !field.selectionValueShowWen.includes(controlToWatch?.value);
          } else {
            field.hidden = controlToWatch?.value == null || controlToWatch?.value === '';
          }
        }
  
        // Ajuste para aplicar clase CSS o configuración basada en `grid`
        if (field.grid) {
          // Aquí podrías aplicar lógica específica si `field.grid` está definido
          // Por ejemplo, podrías agregar una clase CSS dinámica o ajustar el ancho del campo
          field.fullWidth = true;  // Este es un ejemplo de cómo marcar el campo para CSS
        }
  
      }
    });
  
    this.formGroupChange.emit(this.formGroup);
  }
  
}  