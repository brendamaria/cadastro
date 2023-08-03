import { Endereco } from "./endereco";

export class Pessoa {
    constructor(){}

    public id: number;
    public tipoPessoa?: string;
    public nomeRazaoSocial?: string;
    public cpfCnpj?: string;
    public telefone?: string;
    public email?: string;
    public enderecos?: Endereco[]
}
