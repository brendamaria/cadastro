import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoaService } from 'src/app/pessoa.service';
import { OPCOES_TIPO_ENDERECO } from 'src/app/shared/model/enum/opcoes-tipoEndereco';
import { OPCOES_TIPO_PESSOA } from 'src/app/shared/model/enum/opcoes-tipoPessoa';
import { Pessoa } from 'src/app/shared/model/pessoa';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.css']
})
export class AddPessoaComponent {

  form: FormGroup;
  acao:string;
  url:string[];
  disabled = false;

  constructor(
    private pessoaService: PessoaService,
    private fb: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {
    this.url = window.location.href.split('/');
    this.acao = this.url[this.url.length-2];
    if (this.acao == "Editar") { //Ação de editar
      this.popularPessoa(this.url[6]);
    } else {
      this.acao = "Adicionar";
    };

    this.form = this.fb.group({
      id: [null],
      tipoPessoa: [null, Validators.required],
      nomeRazaoSocial: [null, Validators.required],
      cpfCnpj: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [''],
      enderecos: this.fb.array([])
    })

    this.form.controls['nomeRazaoSocial'].disable();
    this.form.controls['cpfCnpj'].disable();
  }

  tipoPessoa = OPCOES_TIPO_PESSOA;

  tipoEndereco = OPCOES_TIPO_ENDERECO;

  fisica = true;

  visible = false;

  enderecos: any[] = [];

  selectedEndereco: any;

  novaPessoa: Pessoa = new Pessoa();


  //   enderecos: any = FormArray;

  formEndereco = this.fb.group({
    id: 0,
    cep: [null, Validators.required],
    endereco: [null],
    cidade: [null, Validators.required],
    numero: [null],
    complemento: [null],
    bairro: [null, Validators.required],
    tipoEndereco: [null, Validators.required],
    uf: [null, Validators.required],
    i: 0
  });

  abrirModal() {
    this.visible = true;
  }

  submit() {
    const p = this.form.value;
    const pessoa: Pessoa = {
      id: p.id,
      tipoPessoa: p.tipoPessoa,
      nomeRazaoSocial: p.nomeRazaoSocial,
      cpfCnpj: p.cpfCnpj,
      telefone: p.telefone,
      email: p.email,
      enderecos: [],
    };

    if (this.form.value.id != null) {
      this.pessoaService.edit(pessoa, this.enderecos).subscribe((response: any) => {
        this.router.navigate([''])
      })
    } else {
      this.pessoaService.save(pessoa, this.enderecos).subscribe((response: any) => {
        this.router.navigate([''])
      });
    }
  }

  aoSelecionar(event: any) {
    if (event.value == 'PF') {
      this.fisica = true
    } else {
      this.fisica = false;
    }
    this.form.controls['nomeRazaoSocial'].enable();
    this.form.controls['cpfCnpj'].enable();
  }

  adicionarEnderecoALista() {
    this.formEndereco.controls['i'].setValue(this.enderecos.length + 1)
    this.enderecos.push(this.formEndereco.value);
    this.formEndereco.reset();
    this.visible = false;
  }

  selectEndereco(event: any) {
    const newEnderecos: any[] = [];
    this.enderecos.forEach(e => {
      if(e.i != event.i) {
        newEnderecos.push(e);
      }
    });
    this.enderecos = newEnderecos;
  }

  popularPessoa(id: string) {
    this.pessoaService.find(Number(id)).subscribe((editar: any) => {
      this.novaPessoa = editar;
    });
  }

}
