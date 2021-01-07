import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServicoPrestadoDTO } from './servico-prestado/servicoPrestadoDTO';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  urlAPI: string = environment.urlAPI + '/api/servico-prestado';

  constructor(private http:HttpClient) { }

  save(servico: ServicoPrestadoDTO): Observable<ServicoPrestadoDTO>{
    return this.http.post<ServicoPrestadoDTO>(`${this.urlAPI}`,servico);
  }

  listAllServicos(): Observable<ServicoPrestado[]>{
    return this.http.get<ServicoPrestado[]>(`${this.urlAPI}/listarServicos`);
  }

  buscarPorNomeMes(nome: string, mes: number): Observable<ServicoPrestado[]>{
    const parametros = new HttpParams().set("nome",nome ? nome : '').set("mes",mes ? mes.toString() : '');

    const url = this.urlAPI+"?"+parametros.toString();
console.log(url);
    return this.http.get<any>(url);
  }
}
