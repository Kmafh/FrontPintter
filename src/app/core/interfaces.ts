import { Validator } from "@angular/forms";

export interface MenuOption {
  label: string;
  icon?: string; // Opcional, si quieres mostrar un icono junto a la opción
  route: string; // La ruta a la que la opción debería llevar
  subMenuOptions?: MenuOption[];
}

export interface EconomyOption {
  label: string;
  icon?: string; // Opcional, si quieres mostrar un icono junto a la opción
  route: string; // La ruta a la que la opción debería llevar
}
export interface Section {
  name: string;
  icon: string;
  route: string;
  updated: Date;
}
export interface DataEconomy {
  label: string;
  icon?: string; // Opcional, si quieres mostrar un icono junto a la opción
  name: string; // La ruta a la que la opción debería llevar
  tipe:string
}
export const ECONOMY_OPTION: EconomyOption[] = [
  { label: 'Ingresos', icon: 'accent', route: '' },
  {
    label: 'Gastos',
    icon: 'warn',
    route: '/about',
  },
  {
    label: 'Disponible',
    icon: 'build',
    route: '/services',
  },
];

export const DATA_MOV_OPTION: DataEconomy[] = [
  {
    label: 'Cantidad',
    icon: 'warn',
    name: 'cash',
    tipe:'num'
  },
  {
    label: 'Fecha',
    icon: 'build',
    name: 'createAt',
    tipe:'date'

  },




  
];

export class ControlCondition {
name?:string;
responseKey?:string;
extraResponseKey?:string;

}
export interface FieldConfig {
  label?: string,
  name?: string,
  type?: string,
  classList?: string,
  option?: any[],
  value?: boolean,
  disabled?: boolean,
  required?: boolean,
  readonly?: boolean,
  hidden?: boolean,
  validation?: Validator[]
  currency?:boolean,
  showWen?:ControlCondition;
  selectionValueShowWen?:any;
  onClick?:any;
  grid?:any;
  fullWidth?:any
}

export interface FormData {
    type:Type
    data: FieldConfig[];
}
export enum Type {
  update = 'update',
  aport='aport'
}
