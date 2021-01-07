import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Contato } from './contato';
import { MatDialog } from '@angular/material/dialog'
import { DetalheContatoComponent } from '../detalhe-contato/detalhe-contato.component'
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  listaContatos!: Contato[];
  ordemDasColunas = ['foto','id','nome','email','favorito'];

  total = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10];

  constructor(private servico: ContatoService, private builder: FormBuilder, private dialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.montarForm();
    this.listAll(this.pagina,this.tamanho);
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.listAll(this.pagina, this.tamanho);
  }

  listAll(pagina = 0, size = 10):void {
    this.servico.listAll(pagina,size)
    .subscribe(
      resultado => {
        this.listaContatos = resultado.content;
        this.total = resultado.totalElements;
        this.pagina = resultado.number;
      },
      error => {

      }
    )
  }

  montarForm(): void {
    this.formulario = this.builder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  save(): void {
    const valores = this.formulario.value;
    
    const contato: Contato = new Contato(valores.nome, valores.email);

    this.servico.save(contato)
    .subscribe(
      response => {
        this.listAll();
        this.snack.open('Contato salvo com sucesso','Sucesso',{duration:2000});
        this.formulario.reset();
      },
      error => {

      }
    )
  }

  favoritar(contato: Contato):void {
    this.servico.favoritar(contato)
    .subscribe(
      resposta => {
        contato.favorito = !contato.favorito;
      }
    )
  }

  uploadFoto(event: Event, contato: Contato){
    if ((event.target as HTMLInputElement).files){
      const arquivos = (event.target as HTMLInputElement).files;
      if(arquivos){
        const f = arquivos[0];
        const formData: FormData = new FormData();
        formData.append("foto",f);
        this.servico.upload(contato,formData).subscribe(resposta => this.listAll());
      }
    }
    
  }

  abrirDialog(contato: Contato):void{
    this.dialog.open(DetalheContatoComponent, {
      height: '440px',
      width: '600px',
      data: contato
    });
  }
}
