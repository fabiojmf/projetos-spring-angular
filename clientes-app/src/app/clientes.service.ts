import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  urlAPI: string = environment.urlAPI + '/api/cliente';

  constructor(private http:HttpClient) { }

  save(cliente:Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.urlAPI}`, cliente);
  }

  updateCliente(cliente:Cliente) : Observable<any> {
    return this.http.put<Cliente>(`${this.urlAPI}/${cliente.id}`, cliente);
  }

  listAllClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.urlAPI}`);
  }

  findById(id: number): Observable<Cliente>{
    return this.http.get<any>(`${this.urlAPI}/${id}`);
  }

  deleteById(cliente: Cliente): Observable<any>{
    return this.http.delete<any>(`${this.urlAPI}/${cliente.id}`);
  }
}
