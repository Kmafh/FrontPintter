import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { BaseService } from '../../core/services/base/base.service';

export class Utils {
  constructor(
    private _snackBar: MatSnackBar,
    public baseService: BaseService,
    public router: Router
  ) {}

  static postItem(
    url: any,
    ev: any,
    snackBar: MatSnackBar,
    baseService: BaseService
  ): Observable<any> {  // Cambiamos el retorno a Observable<any>
    return baseService.postItem(url, ev).pipe(
      tap(
        (item: any) => {
          Utils.openSnackBar(snackBar); // Mostramos el snackbar cuando la operación tiene éxito
        },
        (error) => {
          console.error("Error al hacer el post:", error);
          Utils.openSnackBar(snackBar, "Error al enviar los datos");
        }
      )
    );
  }
  
  static puttItem(
    url: any,
    ev: any,
    snackBar: MatSnackBar,
    baseService: BaseService
  ): Observable<any> {  // Cambiamos el retorno a Observable<any>
    return baseService.putItem(url, ev).pipe(
      tap(
        (item: any) => {
          Utils.openSnackBar(snackBar); // Mostramos el snackbar cuando la operación tiene éxito
        },
        (error) => {
          console.error("Error al hacer el post:", error);
          Utils.openSnackBar(snackBar, "Error al enviar los datos");
        }
      )
    );
  }
  
  static openSnackBar(
    snackBar: MatSnackBar,
    text = 'Hecho',
    action = 'Cerrar'
  ) {
    snackBar.open(text, action, {
      duration: 3000, // Duración en milisegundos
    });
  }

  static setHours(data: any, hours: any) {
    const filteredItems =
      data?.items[0].filter((item: any) => {
        return item.day === data.date;
      }) || [];

    let result = this.difference(filteredItems, hours);
    return result;
  }
  static difference(array1: any[], array2: any[]): any[] {
    return [
      ...array1.filter(
        (item1) => !array2.some((item2) => item1.activeHour === item2)
      ),
      ...array2.filter(
        (item2) => !array1.some((item1) => item1.activeHour === item2)
      ),
    ];
  }

  static transform(value: string): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('es-ES', options);
  }

  static formatNumber(num: number): string {
    const roundedNum = Math.round(num * 100) / 100; // Redondea a dos decimales
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2, // Mínimo de 2 decimales
      maximumFractionDigits: 2, // Máximo de 2 decimales
    }).format(roundedNum);
  }

  static formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan desde 0 (enero)
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  
  static getMonthsBetweenDates(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth(); // Los meses van de 0 a 11
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
  
    // Calcular la diferencia en meses
    const months = (endYear - startYear) * 12 + (endMonth - startMonth);
  
    return months;
  }

  static statusMov(date:any){
    const dateForma = new Date(date)
    return dateForma > new Date() ?'Pendiente':'Realizado'
  }
}
