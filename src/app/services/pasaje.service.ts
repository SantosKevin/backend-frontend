import { Injectable } from '@angular/core';
import { Pasaje } from '../models/pasaje';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasajeService {

  pasajes: Array<Pasaje>;

  urlBase: string ="http://localhost:3000/api/punto3/"

  constructor(private _http:HttpClient) { 
    this.pasajes = new Array<Pasaje>();
  }

  getPasajes():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get( this.urlBase , httpOptions );
  }

  addPasaje(pasaje: Pasaje):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(pasaje);
    return this._http.post(this.urlBase, body , httpOptions );
  }

  deletePasaje(pasaje: Pasaje):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + pasaje._id , httpOptions );
  }

  updatePasaje(pasaje: Pasaje):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(pasaje);
    return this._http.put(this.urlBase + pasaje._id , body , httpOptions );    

  }

  //obtener las diferentes categorias
  obtenerCategorias(){
    var cat = new Array<any>();
    cat = ["Menor","Adulto","Jubilado"];
    return cat;
  }

}
