export class Adelanto {
    _id: string;
    numero: number;
    fecha: Date;
    cobrador: string;
    montoAdelanto: number;

    Adelanto(_id?: string,numero?: number ,fecha?: Date, cobrador?: string, montoAdelanto?: number){
        this._id = _id;
        this.numero = numero;
        this.fecha = fecha;
        this.cobrador = cobrador;
        this.montoAdelanto = montoAdelanto;
    }
}
