import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrcamento } from 'src/models/IOrcamento';
import { ClienteService } from '../../services/cliente.service';
import { ICliente } from 'src/models/ICliente';


@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  constructor(private service: ClienteService, private router: Router) {}
  OrcamentoTotal: number = 0;
  PagamentoTotal: number = 0;

  listCliente: Array<ICliente> = []

  nomesDosMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  date: Date;
  ngOnInit(): void {

    this.service.GetOrcaments().subscribe(
      (data) => {
        if (data !== undefined) {
          if (data.friendlyErrorMessage !== null) {
            alert(data.friendlyErrorMessage);
          } else {
            this.listCliente = data.data as Array<ICliente>;



            for (let i = 0; i < this.listCliente.length; i++){
              this.date = new Date(this.listCliente[i].dataDoAtendimento);
              let mes = this.date.getMonth();
              this.meses[mes].orcamento += this.listCliente[i].orcamento;
              this.meses[mes].pagamento += this.listCliente[i].pagamento;

            }


          }
        }
      },
      (error) => {
        alert('Erro inesperado');
        console.log(error);
      }
    );

    this.meses.forEach(x => {
      this.PagamentoTotal += x.pagamento
      this.OrcamentoTotal += x.orcamento

    })


  }





  meses: Array<IOrcamento> = [

    {mes: 'Janeiro',    orcamento: 0, pagamento: 0 },
    {mes: 'Fevereiro',  orcamento: 0, pagamento: 0 },
    {mes: 'Março',      orcamento: 0, pagamento: 0 },
    {mes: 'Abril',      orcamento: 0, pagamento: 0 },
    {mes: 'Maio',       orcamento: 0, pagamento: 0 },
    {mes: 'Junho',      orcamento: 0, pagamento: 0 },
    {mes: 'Julho',      orcamento: 0, pagamento: 0 },
    {mes: 'Agosto',     orcamento: 0, pagamento: 0 },
    {mes: 'Setembro',   orcamento: 0, pagamento: 0 },
    {mes: 'Outubro',    orcamento: 0, pagamento: 0},
    {mes: 'Novembro',   orcamento: 0, pagamento: 0 },
    {mes: 'Dezembro',   orcamento: 0, pagamento: 0 }

  ];



}
