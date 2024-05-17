import { Login } from '../models/ILogin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'http://localhost:57239/api'
  constructor(private http: HttpClient) { }

  Autenticar(item: Login): Observable<any>{
    return this.http.post('http://localhost:57239/api/Usuarios/Login' , item);
  }
}
