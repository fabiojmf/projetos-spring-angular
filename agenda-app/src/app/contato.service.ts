import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Contato } from './contato/contato'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { PaginacaoContatos } from './contato/paginacaoContatos'

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  urlBase: string = environment.urlBase;

  constructor(private http: HttpClient) { }

  save(contato: Contato): Observable<Contato>{
    return this.http.post<Contato>(this.urlBase,contato);
  }

  listAll(page:number, size: number): Observable<PaginacaoContatos> {
    const parametros = new HttpParams().set('page',page.toString()).set('size',size.toString());
    return this.http.get<any>(`${this.urlBase}?${parametros.toString()}`);
  }

  favoritar(contato: Contato): Observable<any> {
    return this.http.patch(`${this.urlBase}/${contato.id}/favorito`,null);
  }

  upload(contato: Contato, formData: FormData): Observable<any>{
    return this.http.put(`${this.urlBase}/${contato.id}/foto`,formData, {responseType: 'blob'});
  }
}
