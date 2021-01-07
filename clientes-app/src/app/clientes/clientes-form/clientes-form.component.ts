import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente!:Cliente;
  saveSuccess:boolean = false;
  errors!: String[];
  id!: number;

  constructor(
    private service:ClientesService, 
    private router: Router, 
    private activatedRouter: ActivatedRoute) { 
  
      this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRouter.params;

    params.subscribe(
      urlparams => {
        this.id = urlparams['id'];
        if(this.id){
          this.service.findById(this.id)
          .subscribe(
            response => {
              this.cliente = response
            },
            errorResponse => {
              this.cliente = new Cliente()
            }
          )
        }
      }
    )
  }

  onSubmit(){
    if(this.id){
      this.service.updateCliente(this.cliente)
      .subscribe(
        response => {
          this.saveSuccess = true;
          this.errors = [];
      },
      erroResponse => {
        this.errors = ['Erro ao atualizar o cliente']
      })
    }else{
      this.service.save(this.cliente)
      .subscribe(
        response => { 
          this.saveSuccess = true; 
          this.errors = []; 
          this.cliente = response 
        },
        errorResponse => { 
          this.errors = errorResponse.error.error;
          this.saveSuccess = false 
        }
      )
    }
    
  }
  
  voltarListagemClientes():void {
    this.router.navigate(['/clientes/list'])
  }

}
