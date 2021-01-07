import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  nomeToken: string = environment.nomeToken;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const s = localStorage.getItem(this.nomeToken);

    if(s){
      const token = JSON.parse(s);
      const chave = token.access_token;

      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + chave
        }
      })
    }

    return next.handle(request);
  }
}
