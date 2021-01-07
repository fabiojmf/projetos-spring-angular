import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  errors!: String[];
  cadastro!: boolean;
  mensagemCadastroSucesso!: string;

  nomeToken: string = environment.nomeToken;
  
  constructor(private router: Router, private auth: AuthService) { }

  onSubmit():void{
    this.auth.tryLog(this.username, this.password)
    .subscribe(
      resposta => {
        
        const at = JSON.stringify(resposta);
        
        localStorage.setItem(this.nomeToken, at);
        
        this.router.navigate(['/home']);
      },
      errors => {
        console.log(errors);
        this.cadastro = false;
        this.errors = ['Usuario incorreto'];
      }
    )
  }

  iniciarNovoCadastro():void{
    this.cadastro = true;
  }

  cancelarNovoCadastro():void{
    this.cadastro = false;
  }

  cadastrarUsuario():void{
    const usr = new Usuario();
    usr.password = this.password;
    usr.username = this.username;

    this.auth.saveUser(usr)
    .subscribe(
      resposta => {
        this.mensagemCadastroSucesso = "Cadastro realizado";
        this.errors = [];
        this.cadastro = false;
        this.password = '';
        this.username = '';
      },
      respostaError => {
        this.mensagemCadastroSucesso = "";
        this.errors = respostaError.error.error;
      }
    )
  }
}
