import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoaService } from 'src/app/pessoa.service';
import { Endereco } from 'src/app/shared/model/endereco';
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

  constructor(
    private pessoaService: PessoaService,
    private fb: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      tipoPessoa: [null, Validators.required],
      nomeRazaoSocial: [null, Validators.required],
      cpfCnpj: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [''],
      enderecos: this.fb.array([])
    })
  }

  tipoPessoa = OPCOES_TIPO_PESSOA;

  tipoEndereco = OPCOES_TIPO_ENDERECO;

  fisica = true;

  visible = false;

  enderecos: any[] = [];

  selectedEndereco: any;


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
      id: 0,
      tipoPessoa: p.tipoPessoa,
      nomeRazaoSocial: p.nomeRazaoSocial,
      cpfCnpj: p.cpfCnpj,
      telefone: p.telefone,
      email: p.email,
      enderecos: [],
    };
    this.pessoaService.save(pessoa, this.enderecos).subscribe((response) => {
      console.log(response)
      this.router.navigate([''])
    });
  }

  aoSelecionar(event: any) {
    if (event.value == 'PF') {
      this.fisica = true
    } else {
      this.fisica = false;
    }
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


}
