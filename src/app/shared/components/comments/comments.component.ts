import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { BaseService } from '../../../core/services/base/base.service';
import { UserService } from '../../../core/services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from 'express';
import { FormsComments } from './models/forms';
import { environment } from '../../../../enviroments/environment';
import { CommonModule } from '@angular/common';
const endpoint: any = environment.baseUrl;
const url = `${endpoint}/comments`;

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    DynamicFormComponent,
    CommonModule
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  dynamicGroup: any;
  dynamicForm: any;
  page: any = 'login';
  spinner: boolean = false;
  dataSource: any = [];
  @Input() data = { iid: '', uid: '' };
  constructor(
    public baseService: BaseService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.dynamicGroup = FormsComments.commentGroup;
    this.getCommentsByIid()
  }

  onFormGroupChange(formGroup: FormGroup) {
    this.dynamicForm = formGroup;
  }
  getCommentsByIid() {
    this.spinner=true
    const urlPoint = `${url}/${this.data?.iid}`;
    this.baseService.getItems(urlPoint).subscribe((resp: any) => {
      this.dataSource = resp.dataSource.reverse();
    this.spinner=false

    });
  }
  send() {
    let comment:any = {iid:this.data?.iid, uid:this.data.uid, comment:this.dynamicForm.value.comment}
    this.dynamicForm.reset()
    this.baseService.postItem(url,comment).subscribe((resp:any) => {
      this.getCommentsByIid()
    })
  }
}
