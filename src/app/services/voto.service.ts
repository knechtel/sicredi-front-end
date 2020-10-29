import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { Pauta } from "../models/pauta";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotoService {

    url:string = "";
    constructor(private http: HttpClient) {}

    get():Observable<Pauta[]> {
        return this.http.get<Pauta[]>('http://localhost:8082/api/pauta/findAll')
    }

    savePauta(pauta: Pauta): Observable<Pauta> {
        return this.http.post<Pauta>("http://localhost:8082/api/voto/create", pauta)
     
    }
}

interface PautaResponse{
    pauta : Pauta[];
  }