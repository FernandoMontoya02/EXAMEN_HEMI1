export class Clientes{
    id?: string;
    codigo: string;
    fecha: string;
    cliente:string;
    celular: string;
    descripcion: string;
    constructor(codigo: string, fecha:string, cliente:string, celular:string, descripcion:string){
        this.codigo = codigo;
        this.fecha = fecha;
        this.cliente = cliente;
        this.celular = celular;
        this.descripcion = descripcion;
    }

}