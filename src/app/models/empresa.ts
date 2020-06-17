export class Empresa {
    _id: number;
    nombre: string;
    email: string;

    Empresa(nombre?: string, email?: string){
        this.nombre = nombre;
        this.email = email;
    }
}
