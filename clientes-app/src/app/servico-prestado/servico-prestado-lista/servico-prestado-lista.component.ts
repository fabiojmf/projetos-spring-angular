import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoPrestadoService } from '../../servico-prestado.service';
import { ServicoPrestadoDTO } from '../servicoPrestadoDTO';
import { ServicoPrestado } from '../servicoPrestado';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  servicosPrestados!: ServicoPrestado[];
  nome!: string;
  mes!: number;
  meses!: number[];
  message!: string;

  constructor(private servico: ServicoPrestadoService, private router:Router) { 
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  ngOnInit(): void {
    this.servico.listAllServicos()
    .subscribe(
      resultado => {
        this.servicosPrestados = resultado
      }
    )
  }

  newServico():void{
    this.router.navigate(['/servico-prestado/form'])
  }

  buscarPorNomeMes():void{
    if(!this.nome && !this.mes){
      this.message = "";
      this.ngOnInit();
    }else{
      this.servico.buscarPorNomeMes(this.nome,this.mes)
      .subscribe(
        resposta => {
          this.servicosPrestados = resposta;
          if(this.servicosPrestados.length <= 0){
            this.message = 'Registro não encontrado';
          }else{
            this.message = "";
          }
        }
      )
    }
  }
}
