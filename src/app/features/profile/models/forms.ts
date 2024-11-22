import { FormData, Type } from "../../../core/interfaces";
import { UserConstans } from "./constans";

export namespace FormsUser {

    const name = () => {
        return {
            type:'input',
            label:UserConstans.name.label,
            name:UserConstans.name.name,
            required:true,
            grid:100
        }
    }
    const password = (grid?:any) => {
        return {
            type:'pass',
            label:UserConstans.password.label,
            name:UserConstans.password.name,
            required:true,
            grid:100


        }
    }
    const lastName = () => {
        return {
            type:'input',
            label:UserConstans.lastName.label,
            name:UserConstans.lastName.name,
            required:true,
            grid:100

        }
    }
    const createAt = () => {
        return {
            type:'date',
            label:UserConstans.createAt.label,
            name:UserConstans.createAt.name,
            required:true,
            grid:100

        }
    }
    const email = () => {
        return {
            type:'input',
            label:UserConstans.email.label,
            name:UserConstans.email.name,
            required:true,
            grid:100

        }
    }
    const sex = () => {
        return {
            type:'radio',
            label:UserConstans.sex.label,
            name:UserConstans.sex.name,
            option:UserConstans.sex.option,

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
            label:UserConstans.city.label,
            name:UserConstans.city.name,
            required:true,
            grid:100

        }
    }
    const pro = () => {
        return {
            type:'input',
            label:UserConstans.pro.label,
            name:UserConstans.pro.name,
            required:true,
            grid:100

        }
    }
    const study = () => {
        return {
            type:'input',
            label:UserConstans.study.label,
            name:UserConstans.study.name,
            required:true,
            grid:100

        }
    }
    const curs = () => {
        return {
            type:'input',
            label:UserConstans.curs.label,
            name:UserConstans.curs.name,
            required:true,
            grid:100

        }
    }
    const job = () => {
        return {
            type:'input',
            label:UserConstans.job.label,
            name:UserConstans.job.name,
            required:true,
            grid:100

        }
    } 

    ///MOVV

    export const updateGroup: FormData = {
        type: Type.update,
        data: [
            name(),
            lastName(),
            createAt(),
            sex(),
        ],
    };

    export const registerGroup: FormData = {
        type: Type.update,
        data: [
            name(),
            lastName(),
            createAt(),
            sex(),
            divider(),
label('Datos de sesión'),
            email(),
            password(),
            
        ],
    };

    export const updateProGroup: FormData = {
        type: Type.update,
        data: [
            pro(),
        ],
    };
    export const updateCityGroup: FormData = {
        type: Type.update,
        data: [
            city(),
        ],
    };
    export const updateStudyGroup: FormData = {
        type: Type.update,
        data: [
            study(),
        ],
    };
    export const updateCursGroup: FormData = {
        type: Type.update,
        data: [
            curs(),
        ],
    };
    export const updateJobGroup: FormData = {
        type: Type.update,
        data: [
            job(),
        ],
    };
}