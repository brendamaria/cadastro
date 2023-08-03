export class Endereco {
    constructor(
        public id?: number,
        public cep?: number,
        public endereco?: string,
        public cidade?: string,
        public numero?: number,
        public complemento?: string,
        public bairro?: string,
        public tipoDoEndereco?: string,
        public uf?: string
    ){}
}