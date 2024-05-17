import { ClienteService } from '../../services/cliente.service';
import { Component, OnInit, inject } from '@angular/core';
import { ICliente } from '../../models/ICliente';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css'],
})
export class SearchCustomersComponent implements OnInit {
  constructor(private ClienteService: ClienteService, private router: Router) {}

  body: HTMLElement;
  ngOnInit(): void {
    this.body = document.querySelector('#body');


  }

  private modalService = inject(NgbModal);
	closeResult = '';


  today = new Date();



  onServiceFilterChange(event) {
    const selectElement = event.target;
    const optionIndex = selectElement.selectedIndex;
    if (optionIndex == 0) {
      this.filterCliente.tipoDeServico = 'Todos';
    } else if (optionIndex == 1) {
      this.filterCliente.tipoDeServico = 'Instalacao';
    } else if (optionIndex == 2) {
      this.filterCliente.tipoDeServico = 'Higienizacao';
    } else if (optionIndex == 3) {
      this.filterCliente.tipoDeServico = 'Remocao';
    } else {
      this.filterCliente.tipoDeServico = 'Revisao';
    }
  }

  filterCliente: ICliente = {
    clienteId: 0,
    nomeCliente: '',
    clienteEndereco: '',
    clienteBairro: '',
    telefoneCliente: null,
    tipoDeServico: 'Todos',
    dataDoAtendimento: new Date(),
    cep: 0,
    numero: 0,
    complemento: '',
    cidade: '',
    orcamento: 0,
    pagamento: 0,
    pagamentoConfirmado: false,
  };




  testeCliente: ICliente = {
    clienteId: 12,
    nomeCliente: 'Joao Freitas',
    clienteEndereco: 'Rua do abacaxi',
    clienteBairro: 'Oceano',
    telefoneCliente: 123123123,
    tipoDeServico: 'Instalacao',
    dataDoAtendimento: new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate(),
      0,
      0,
      0,
      0
    ),
    cep: 11034545,
    numero: 22,
    complemento: '22',
    cidade: 'Sao Paulo',
    orcamento: 0,
    pagamento: 0,
    pagamentoConfirmado: false,
  }
  listCliente: Array<ICliente> = [this.testeCliente];


  addCliente: ICliente = {
    clienteId: 0,
    nomeCliente: '',
    clienteEndereco: '',
    clienteBairro: '',
    telefoneCliente: null,
    tipoDeServico: 'Instalacao',
    dataDoAtendimento: new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate(),
      0,
      0,
      0,
      0
    ),
    cep: null,
    numero: null,
    complemento: '',
    cidade: '',
    orcamento: 0,
    pagamento: 0,
    pagamentoConfirmado: false,
  };

  onServiceChange(event) {
    const selectElement = event.target;
    const optionIndex = selectElement.selectedIndex;
    if (optionIndex == 0) {
      this.addCliente.tipoDeServico = 'Instalacao';
    } else if (optionIndex == 1) {
      this.addCliente.tipoDeServico = 'Higienizacao';
    } else if (optionIndex == 2) {
      this.addCliente.tipoDeServico = 'Remocao';
    } else {
      this.addCliente.tipoDeServico = 'Revisao';
    }
  }

  updateFilterDate(event) {
    let data;
    if (event.target.value == '') {
      data = null;
    } else {
      data = event.target.value;
      const ano = parseInt(data.substr(0, 4), 10);
      const mes = parseInt(data.substr(5, 2), 10) - 1;
      const dia = parseInt(data.substr(8, 2), 10);

      this.filterCliente.dataDoAtendimento = new Date(ano, mes, dia);
    }
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



      this.filterCliente.dataDoAtendimento = new Date(ano, mes, dia);
    }

    console.log(data)
  }

  errorMsgInsOrUpd: string;

  ValidateInsUpd(item: ICliente) {
    this.errorMsgInsOrUpd = '';

    if (
      item.nomeCliente === null ||
      item.nomeCliente === '' ||
      item.nomeCliente === undefined
    ) {
      this.errorMsgInsOrUpd = 'Por favor, insira o nome do cliente';
      return false;
    }
    if (item.telefoneCliente == null || item.telefoneCliente === undefined) {
      this.errorMsgInsOrUpd = 'Por favor, insira o telefone do cliente';
      return false;
    }
    if (
      item.clienteEndereco === null ||
      item.clienteEndereco === '' ||
      item.clienteEndereco === undefined
    ) {
      this.errorMsgInsOrUpd = 'Por favor, insira o endereço do cliente';
      return false;
    }
    if (
      item.clienteBairro === null ||
      item.clienteBairro === '' ||
      item.clienteBairro === undefined
    ) {
      this.errorMsgInsOrUpd = 'Por favor, insira um bairro';
      return false;
    }
    return true;
  }

  FindClienteList(id: number): ICliente {
    let findGroup: ICliente = this.listCliente.find((x) => x.clienteId === id);

    if (findGroup != null) {
      this.updCliente = findGroup;
    }

    return this.updCliente;
  }

  ConfirmPayment(id: number): ICliente {
    let findGroup: ICliente = this.listCliente.find((x) => x.clienteId === id);

    if (findGroup != null) {
      this.updCliente = findGroup;
    }

    this.ClienteService.ConfirmPayment(this.updCliente).subscribe(
      (data) => {
        if (data !== undefined) {
          if (data.friendlyErrorMessage !== null) {
            alert(data.friendlyErrorMessage);
          } else {
            alert('Pagamento Confirmado!');
            this.listCliente.find((x) => { x.clienteId === id; x.pagamentoConfirmado = true;}  );

          }
        }
      },
      (error) => {
        alert('Erro inesperado');
        console.log(error);
      }
    );;

    return this.updCliente;
  }


  updCliente: ICliente = {
    clienteId: 0,
    nomeCliente: '',
    clienteEndereco: '',
    clienteBairro: '',
    telefoneCliente: null,
    tipoDeServico: 'Instalacao',
    dataDoAtendimento: new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate(),
      0,
      0,
      0,
      0
    ),
    cep: null,
    numero: null,
    complemento: '',
    cidade: '',
    orcamento: 0,
    pagamento: 0,
    pagamentoConfirmado: false,
  };


  updateModal: boolean = false;
  updateCliente: ICliente
  Update(cliente:ICliente) {

    // this.updCliente = this.FindClienteList(id);
    this.updateModal = true;
    this.updateCliente = cliente;

    if (!this.ValidateInsUpd(this.updCliente)) {
      alert(this.errorMsgInsOrUpd);
      return false;
    }

    this.ClienteService.Atualizar(this.updCliente).subscribe(
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



  Adcionar() {
    if (!this.ValidateInsUpd(this.addCliente)) {
      alert(this.errorMsgInsOrUpd);
      return false;
    }

    // console.log('erro na controller')
    console.log(this.addCliente.cep)

    this.ClienteService.Inserir(this.addCliente).subscribe(
      (data) => {
        if (data !== undefined) {
          if (data.friendlyErrorMessage !== null) {
            alert(data.friendlyErrorMessage);
          } else {
            alert('Cliente inserido com sucesso!');
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

  buscado: boolean = false;

  Search() {
    if (this.filterCliente.tipoDeServico === 'Todos') {
      this.filterCliente.tipoDeServico = null;
    }

    this.ClienteService.Buscar(this.filterCliente).subscribe(
      (data) => {
        if (data !== undefined) {
          if (data.friendlyErrorMessage != null) {
            alert(data.friendlyErrorMessage);
          } else {
            this.listCliente = data.data as Array<ICliente>;
            this.buscado = true;
          }
        }
      },
      (error) => {
        alert('Erro inesperado');
        console.log(error);
      }
    );
  }

  async onFocusOutEvent($event) {
    // let mensagemErro = document.getElementById('erro');

    // mensagemErro.innerHTML = ''; //temos que inicializar como vazio se nao nao conseguimos escreve-la depois

    let cep = this.addCliente.cep;

    try {
      let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      let consultaCEPConvertida = await consultaCEP.json();
      if (consultaCEPConvertida.erro) {
        throw Error('CEP inválido');
      }

      this.addCliente.cidade = consultaCEPConvertida.localidade;
      this.addCliente.clienteEndereco = consultaCEPConvertida.logradouro;
      this.addCliente.clienteBairro = consultaCEPConvertida.bairro;
    } catch (erro) {
      // mensagemErro.innerHTML = '<p>CEP inválido! Tente novamente</p>';
      console.log(erro);
    }
  }

  darkmode: boolean = true;

  togleMode() {
    if (!this.darkmode) {
      this.body.classList.remove('dark-mode');
    } else {
      this.body.classList.add('dark-mode');
    }
    this.darkmode = !this.darkmode;

    // this.darkmode = !this.darkmode;
  }
}
