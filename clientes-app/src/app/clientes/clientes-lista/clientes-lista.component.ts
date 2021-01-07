import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { Cliente } from '../cliente';
import {ClientesService} from '../../clientes.service'

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes!:Cliente[];
  clienteSelecionado!: Cliente;
  delSuccess!:String;
  errors!: String;

  constructor(
    private servise: ClientesService,
    private router: Router) { 

    }

  ngOnInit(): void {
    this.servise.listAllClientes()
    .subscribe( resposta => this.clientes = resposta)
  }

  newCliente():void{
    this.router.navigate(['/clientes/form'])
  }

  preparaDelCliente(cliente: Cliente):void {
    this.clienteSelecionado = cliente;
  }

  deleteById():void{
    this.servise.deleteById(this.clienteSelecionado)
    .subscribe(
      response => { 
        this.delSuccess = 'Cliente excluído com sucesso'
        this.ngOnInit();
      },
      erro => {
        this.errors = 'Erro ao excluir cliente'
      }
    )
  }
}
