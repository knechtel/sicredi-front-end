import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Voto } from '../models/voto';
import { Pauta } from "../models/pauta";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotoService {

    url:string = "";
    constructor(private http: HttpClient) {}

    get():Observable<Pauta[]> {
        return this.http.get<Pauta[]>('http://ec2-18-231-107-181.sa-east-1.compute.amazonaws.com:8080/api/pauta/findAll')
    }

    saveVoto(voto: Voto): Observable<Voto> {
        return this.http.post<Voto>("http://ec2-18-231-107-181.sa-east-1.compute.amazonaws.com:8080/api/voto/create", voto)
     //  return this.http.post<Voto>("http://localhost:8081/api/voto/create", voto)
    }
}

interface PautaResponse{
    pauta : Pauta[];
}