import { FormData, Type } from "../../../core/interfaces";
import { ObraConstans } from "./constans";

export namespace FormsObra {

    const name = () => {
        return {
            type:'input',
            label:ObraConstans.name.label,
            name:ObraConstans.name.name,
            required:true,
            grid:100

        }
    }
    const tipe = (grid?:any) => {
        return {
            type:'select',
            label:ObraConstans.tipe.label,
            name:ObraConstans.tipe.name,
            option:ObraConstans.tipe.option,
            required:true,
            grid:100


        }
    }
    const description = () => {
        return {
            type:'textarea',
            label:ObraConstans.description.label,
            name:ObraConstans.description.name,
            required:true,
            grid:100

        }
    }
    const email = () => {
        return {
            type:'input',
            label:ObraConstans.email.label,
            name:ObraConstans.email.name,
            required:true,
            grid:100

        }
    }
    const sex = () => {
        return {
            type:'radio',
            label:ObraConstans.sex.label,
            name:ObraConstans.sex.name,
            option:ObraConstans.sex.option,

            required:true,

        }
    }
    const label = (text:string = '') => {
        return {
            type: 'label', 
            label: text, 
            hidden: false
        }
    }
    
    const divider = (text:string = '') => {
        return {
            type: 'divider', 
            hidden: false
        }
    }
    const city = () => {
        return {
            type:'input',
            label:ObraConstans.city.label,
            name:ObraConstans.city.name,
            required:true,
            grid:100

        }
    }
    const pro = () => {
        return {
            type:'input',
            label:ObraConstans.pro.label,
            name:ObraConstans.pro.name,
            required:true,
            grid:100

        }
    }
    const study = () => {
        return {
            type:'input',
            label:ObraConstans.study.label,
            name:ObraConstans.study.name,
            required:true,
            grid:100

        }
    }
    const curs = () => {
        return {
            type:'input',
            label:ObraConstans.curs.label,
            name:ObraConstans.curs.name,
            required:true,
            grid:100

        }
    }
    const job = () => {
        return {
            type:'input',
            label:ObraConstans.job.label,
            name:ObraConstans.job.name,
            required:true,
            grid:100

        }
    } 

    ///MOVV

    export const updateGroup: FormData = {
        type: Type.update,
        data: [
            name(),
            tipe(),
            description(),
        ],
    };

    export const createGroup: FormData = {
        type: Type.update,
        data: [
            name(),
            tipe(),
            sex(),
            divider(),
label('Datos de sesión'),
            email(),
            
        ],
    };

}