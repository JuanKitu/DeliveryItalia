export interface Cuentas{
    idCuenta:number,
    email:string,
    password:string,
    salt:string,
    userType:string
};
export interface Login{
    email:string,
    password:string
};