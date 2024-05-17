import { ICliente } from '../models/ICliente';
import { IResult } from '../models/IResult';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'http://localhost:57239/api'
  constructor(private http: HttpClient) { }

  Buscar(item: ICliente): Observable<IResult>{

    return <Observable<IResult>>this.http.post('http://localhost:57239/api/Clientes/ListClientes' , item);
  }

  Inserir(item: ICliente): Observable<any>{
    return <Observable<IResult>>this.http.post('http://localhost:57239/api/Clientes/AddCliente' , item);
  }

  Atualizar(item: ICliente): Observable<any>{
    return <Observable<IResult>>this.http.put('http://localhost:57239/api/Clientes/UpdateCliente' , item);
  }

  ConfirmPayment(item: ICliente): Observable<any>{
    return <Observable<IResult>>this.http.put('http://localhost:57239/api/Clientes/ConfirmPayment' , item);
  }

  GetAll(): Observable<IResult>{
    return <Observable<IResult>>this.http.get('http://localhost:57239/api/Clientes/');
  }

  GetOrcaments(): Observable<IResult>{

    return <Observable<IResult>>this.http.get('http://localhost:57239/api/Clientes/GetOrcaments');
  }
}
