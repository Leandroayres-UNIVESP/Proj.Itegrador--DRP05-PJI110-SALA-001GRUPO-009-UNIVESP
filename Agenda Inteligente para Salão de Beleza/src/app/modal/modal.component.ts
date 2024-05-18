import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICliente } from 'src/models/ICliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private ClienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
  }

  @Input() Cliente: ICliente;



  Update() {
    // this.updCliente = this.FindClienteList(id);

    // if (!this.ValidateInsUpd(this.Cliente)) {
    //   alert(this.errorMsgInsOrUpd);
    //   return false;
    // }

    this.ClienteService.Atualizar(this.Cliente).subscribe(
      (data) => {
        if (data !== undefined) {
          if (data.friendlyErrorMessage !== null) {
            alert(data.friendlyErrorMessage);
          } else {
            alert('Cliente atualizado com sucesso!');
          }
        }
      },
      (error) => {
        alert('Erro inesperado');
        console.log(error);
      }
    );

    return true;
  }



  updateInsertDate(event) {
    let data;
    if (event.target.value == '') {
      data = null;
    } else {
      data = event.target.value;
      const ano = parseInt(data.substr(0, 4), 10);
      const mes = parseInt(data.substr(5, 2), 10) - 1;
      const dia = parseInt(data.substr(8, 2), 10);

      this.Cliente.dataDoAtendimento = new Date(ano, mes, dia);
    }
  }



  async onFocusOutEvent($event) {
    // let mensagemErro = document.getElementById('erro');

    // mensagemErro.innerHTML = ''; //temos que inicializar como vazio se nao nao conseguimos escreve-la depois

    let cep = this.Cliente.cep;

    try {
      let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      let consultaCEPConvertida = await consultaCEP.json();
      if (consultaCEPConvertida.erro) {
        throw Error('CEP inválido');
      }

      this.Cliente.cidade = consultaCEPConvertida.localidade;
      this.Cliente.clienteEndereco = consultaCEPConvertida.logradouro;
      this.Cliente.clienteBairro = consultaCEPConvertida.bairro;
    } catch (erro) {
      // mensagemErro.innerHTML = '<p>CEP inválido! Tente novamente</p>';
      console.log(erro);
    }
  }



  onServiceChange(event) {
    const selectElement = event.target;
    const optionIndex = selectElement.selectedIndex;
    if (optionIndex == 0) {
      this.Cliente.tipoDeServico = 'Instalacao';
    } else if (optionIndex == 1) {
      this.Cliente.tipoDeServico = 'Higienizacao';
    } else if (optionIndex == 2) {
      this.Cliente.tipoDeServico = 'Remocao';
    } else {
      this.Cliente.tipoDeServico = 'Revisao';
    }
  }

}
