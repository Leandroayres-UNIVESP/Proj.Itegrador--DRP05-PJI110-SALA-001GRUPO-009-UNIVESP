import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/ILogin';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']


})
export class LoginComponent implements OnInit {




  constructor(
    private loginservice: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    //this is intentional

  }

  login: Login = {
    email: "",
    senha: ""
  };


   url = 'Agenda Inteligente para Salão de Beleza.com';
   GoogleChartAPI = 'https://chart.googleapis.com';
   apiParams = '/chart?cht=qr&chs=400x400&chl=';
   teste = this.GoogleChartAPI + this.apiParams + encodeURIComponent(this.url);


  Logar(){
    // this.loginservice.Autenticar(this.login).subscribe(
    //   data => {
    //     console.log("autenticado");
    //     this.router.navigate(['/schedule']);
    //   },
    //   error => {
    //   alert('Usuario ou senha inválidos');
    //   console.log(error);
    //   }
    //   );

      this.router.navigate(['/schedule']);
    }

}
