import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlAPI: string = environment.urlAPI + "/api/usuario";
  urlToken: string = environment.urlAPI + environment.urlToken;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  constructor(private http:HttpClient) { }

  saveUser(usuario:Usuario): Observable<any>{
    return this.http.post<any>(this.urlAPI,usuario);
  }

  tryLog(username: string, password: string): Observable<any>{
    const p = new HttpParams()
              .set('username',username)
              .set('password', password)
              .set('grant_type','password');

    const headers = {
      'Authorization':'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type':'application/x-www-form-urlencoded'
    }
    return this.http.post(this.urlToken,p.toString(),{ headers });
  }
}
