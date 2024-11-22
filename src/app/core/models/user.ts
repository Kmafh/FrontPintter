import { environment } from "../../../enviroments/environment";

const base_url= environment.baseUrl
export class User {
    constructor(
        public name: string,
        public lastname: string,
        public email: string,
        public uid: string,
        public img: string,
        public role?: string,
        public password?: string,
        public active?: boolean,
        public createAt?:Date,
        public sex?:string,
        public job?:string,
        public city?:string,
        public curs?:string,
        public pro?:string,
        public study?:string
    ){}


}
