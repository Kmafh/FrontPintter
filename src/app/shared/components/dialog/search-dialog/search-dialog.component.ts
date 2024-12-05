import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseService } from '../../../../core/services/base/base.service';
import { UserService } from '../../../../core/services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardComponent } from '../../../../features/dashboard/dashboard.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsUser } from '../../../../features/profile/models/forms';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { map } from 'rxjs';
import { environment } from '../../../../../enviroments/environment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const endpoint: any = environment.baseUrl;
@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [
    DynamicFormComponent,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe
  ],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss',
})
export class SearchDialogComponent implements OnInit {
  dynamicGroup: any = 0;
  dynamicForm: any;

  readonly dialogRef = inject(MatDialogRef<DashboardComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  filter: string = this.data.value;
  filteredItems: any = [];
  spinner: boolean = false;
  
  displayedColumns: string[] = ['img', 'name'];
  dataSource!: MatTableDataSource<any>;
  constructor(
    public baseService: BaseService,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {

    // Assign the data to the data source for the table to render
  }
  ngOnInit(): void {
    this.dynamicGroup = FormsUser.updateGroup;
    const tipe = this.data.tipe;
    let url;
    switch (tipe) {
      case 'user':
        this.filterUser();
        break;
      case 'obra':
        url = `${endpoint}/obra`;
    this.filterDataSource(url)
        break;
      case 'exposition':
        url = `${endpoint}/obra`;
        this.filterDataSource(url)
        break;
      case 'curs':
        this.dynamicGroup = FormsUser.updateCursGroup;
        break;
      case 'job':
        this.dynamicGroup = FormsUser.updateJobGroup;
        break;
    }
  }
  filterUser(): void {
    const url: any = `${endpoint}/user`;
    this.baseService
      .getItems(url)
      .pipe(
        map((resp: any) =>
          resp.usuarios.filter(
            (item: any) =>
              item.name.toLowerCase().includes(this.filter.toLowerCase()) ||
              item.email.toLowerCase().includes(this.filter.toLowerCase())
          )
        )
      )
      .subscribe((filteredItems) => {
        console.log(filteredItems);
        this.filteredItems = filteredItems; // Guardar los resultados filtrados
    this.dataSource = new MatTableDataSource(filteredItems);

      });
  }
  filterDataSource(url:string): void {
    this.baseService
      .getItems(url)
      .pipe(
        map((resp: any) =>
          resp.dataSource.filter(
            (item: any) =>
              item.name.toLowerCase().includes(this.filter.toLowerCase())
          )
        )
      )
      .subscribe((filteredItems) => {
        console.log(filteredItems);
        this.filteredItems = filteredItems; // Guardar los resultados filtrados
    this.dataSource = new MatTableDataSource(filteredItems);

      });
  }
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
