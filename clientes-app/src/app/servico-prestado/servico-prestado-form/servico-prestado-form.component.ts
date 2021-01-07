import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestadoDTO } from '../servicoPrestadoDTO';
import { ServicoPrestadoService } from '../../servico-prestado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes!: Cliente[];
  servicoPrestado!: ServicoPrestadoDTO;
  saveSuccess:boolean = false;
  errors!: String[];

  constructor(private clienteService:ClientesService, private servicoService: ServicoPrestadoService, private router:Router) {
    this.servicoPrestado = new ServicoPrestadoDTO();
  }

  ngOnInit(): void {
    this.clienteService.listAllClientes()
    .subscribe(
      resposta => {
        this.clientes = resposta
      }
    )
  }
  onSubmit():void{
    this.servicoService.save(this.servicoPrestado)
    .subscribe(
        response => { 
          this.saveSuccess = true; 
          this.errors = []; 
          this.servicoPrestado = new ServicoPrestadoDTO();
        },
        errorResponse => { 
          this.errors = errorResponse.error.error;
          this.saveSuccess = false 
        }
      )
  }

  voltarListagemServicos():void{
    this.router.navigate(['/servico-prestado/list']);
  }
}
