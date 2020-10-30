import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { Pauta } from "../models/pauta";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PautaService {

    url:string = "";
    constructor(private http: HttpClient) {}

    get():Observable<Pauta[]> {
        return this.http.get<Pauta[]>('http://ec2-18-231-107-181.sa-east-1.compute.amazonaws.com:8080/api/pauta/findAll')
    }

    savePauta(pauta: Pauta): Observable<Pauta> {
        return this.http.post<Pauta>("http://ec2-18-231-107-181.sa-east-1.compute.amazonaws.com:8080/api/pauta/create", pauta)
     
    }
}

interface PautaResponse{
    pauta : Pauta[];
  }