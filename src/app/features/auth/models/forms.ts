import { FormData, Type } from "../../../core/interfaces";
import { AuthConstans } from "./constans";

export namespace FormsAuth {

    const nameEmail = () => {
        return {
            type:'input',
            label:AuthConstans.nameEmail.label,
            name:AuthConstans.nameEmail.name,
            required:true,
            grid:100
        }
    }
    const password = (grid?:any) => {
        return {
            type:'pass',
            label:AuthConstans.password.label,
            name:AuthConstans.password.name,
            required:true,
            grid

        }
    }
    const name = () => {
        return {
            type:'input',
            label:AuthConstans.name.label,
            name:AuthConstans.name.name,
            required:true,

        }
    }

    const lastName = () => {
        return {
            type:'input',
            label:AuthConstans.lastName.label,
            name:AuthConstans.lastName.name,
            required:true,
        }
    }
    const createAt = () => {
        return {
            type:'date',
            label:AuthConstans.createAt.label,
            name:AuthConstans.createAt.name,
            required:true,
        }
    }
    const email = () => {
        return {
            type:'input',
            label:AuthConstans.email.label,
            name:AuthConstans.email.name,
            required:true,

        }
    }
    const sex = () => {
        return {
            type:'radio',
            label:AuthConstans.sex.label,
            name:AuthConstans.sex.name,
            option:AuthConstans.sex.option,

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
    // const button = (funt()) => {
    //     return {
    //         type: 'button', 
    //         label: 'Save', 
    //         color: 'primary', 
    //         onClick: this.saveForm
    //     }
    // }

    ///MOVV

    export const loginGroup: FormData = {
        type: Type.update,
        data: [
            nameEmail(),
            label(''),
            password(100),
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

    
}