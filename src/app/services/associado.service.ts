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
        return this.http.get<Associado[]>('http://ec2-18-231-107-181.sa-east-1.compute.amazonaws.com:8080/api/associado/findAll')
    }

    saveAssociado(associado: Associado): Observable<Associado> {
        return this.http.post<Associado>("http://ec2-18-231-107-181.sa-east-1.compute.amazonaws.com:8080/api/associado/create", associado)
        
    }
}
