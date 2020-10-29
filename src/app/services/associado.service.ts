import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { Associado } from "../models/associado";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociadoService {

    url:string = "";
    constructor(private http: HttpClient) {}

    get():Observable<Associado[]> {
        return this.http.get<Associado[]>('http://localhost:8082/api/associado/findAll')
    }

    saveAssociado(associado: Associado): Observable<Associado> {
        return this.http.post<Associado>("http://localhost:8082/api/associado/create", associado)
     
    }
}
