import { FormData, Type } from "../../../../core/interfaces";

export namespace FormsComments {

    const comment = () => {
        return {
            type:'textarea',
            label:"Comentario",
            name:'comment',
            grid:100
        }
    }
    const divider = (text:string = '') => {
        return {
            type: 'divider', 
            hidden: false
        }
    }
    

    export const commentGroup: FormData = {
        type: Type.update,
        data: [
            comment(),
        ],
    };

    

    
}