import { Injectable } from '@angular/core';
import { Asistente } from '../models/asistente'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsistenteService {

  asistentes:Array<Asistente>;

  urlBase: string ="http://localhost:3000/api/punto2/"

  constructor(private _http:HttpClient) { 
    this.asistentes = new Array<Asistente>();
  }

  getAsistentes():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        //luego iran las claves
      })
    };
    return this._http.get( this.urlBase , httpOptions );
  }

  addAsistente(asistente: Asistente):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(asistente);
    return this._http.post(this.urlBase, body , httpOptions );
  }

  deleteAsistente(asistente: Asistente):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + asistente._id , httpOptions );
  }

  updateAsistente(asistente: Asistente):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(asistente);
    return this._http.put(this.urlBase + asistente._id , body , httpOptions );    

  }
}
