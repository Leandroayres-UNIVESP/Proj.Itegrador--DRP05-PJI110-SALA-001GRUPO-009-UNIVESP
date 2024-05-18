export interface ICliente{
  clienteId: number;
  nomeCliente: string;
  telefoneCliente:number;
  clienteEndereco:string;
  dataDoAtendimento: Date;

  clienteBairro:string;
  numero: number;
  complemento: string;
  cidade: string;
  tipoDeServico:string;
  cep: number;
  orcamento: number;
  pagamento: number;
  pagamentoConfirmado: boolean;
}


