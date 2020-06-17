export class Asistente {
    _id: string;
    usuario: string;
    nombreOrganizacion: string;
    requiereConstancia: boolean;

    Asistente(_id?: string ,usuario?: string, nombreOrganizacion?: string, requiereConstancia?: boolean){
        this._id = _id;
        this.usuario = usuario;
        this.nombreOrganizacion = nombreOrganizacion;
        this.requiereConstancia = requiereConstancia;
    }
}
