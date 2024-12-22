export interface Task {
    id?:number; //optional because backend id field generated automatically
    description:string;
    completed:boolean;
}
