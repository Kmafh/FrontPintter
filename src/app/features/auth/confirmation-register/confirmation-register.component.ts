import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BaseService } from '../../../core/services/base/base.service';
import { UserService } from '../../../core/services/users/users.service';
import { Utils } from '../../../core/utils/utils';
import { environment } from '../../../../enviroments/environment';
const endpoint: any = environment.baseUrl;
@Component({
  selector: 'app-confirmation-register',
  templateUrl: './confirmation-register.component.html',
  styleUrls: ['./confirmation-register.component.css']
})
export class ConfirmationRegisterComponent  implements OnInit {
  token: string | null = null;
  registerForm: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    public baseService: BaseService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      lastname: [''],
      email: [''],
      password: [''],
      img: [''],
      createAt: [''],
      sex: [''],
      pro: [''],
      city: [''],
      study: [''],
      curs: [''],
      job: [''],
    });
  }

  ngOnInit(): void {
    // Obtener y decodificar los datos de la URL
    const data = this.route.snapshot.queryParamMap.get('data');
    if (data) {
      const decodedPayload = JSON.parse(decodeURIComponent(data));
      this.registerForm.patchValue(decodedPayload); // Rellenar el formulario con los datos
      const url = endpoint+'/user'
      Utils.postItem(url,this.registerForm.value, this._snackBar, this.baseService).subscribe((resp:any) => {
        this.router.navigate(['']);
        Utils.openSnackBarManual(this._snackBar,'Enhorabuena, ya puedes loguearte para comenzar a utilizar Pintter!');
      })
    }
  }

}
