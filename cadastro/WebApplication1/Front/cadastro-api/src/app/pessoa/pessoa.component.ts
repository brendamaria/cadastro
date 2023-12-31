import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Router } from '@angular/router';
import { EndecoService } from '../endeco.service';
import { Pessoa } from '../shared/model/pessoa';
import { Endereco } from '../shared/model/endereco';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  pessoas: Pessoa[];

  idEndereco: any[];

  id: number;
  filtro:string = '';
  acao:string;

  excluir = false;
  ngOnInit(): void {
    this.pessoaService.findAllPessoas().subscribe((pessoa: any) => {
      this.pessoas = pessoa;
    });
  }

  constructor(private pessoaService: PessoaService, private router: Router,
     private fb: FormBuilder,
     private enderecoService: EndecoService) { }

  addPessoa() {
    this.router.navigate(['/add'])
  }

  abrirModal(event: any) {
    this.idEndereco = event.enderecos;
    this.excluir = true;
    this.id = event.id;
  }

  selectPeessoa() {
    this.idEndereco.forEach((x) => {
      this.enderecoService.delete(x.id).subscribe(e => {
      })
    })
    this.idEndereco = [];
    this.pessoaService.delete(this.id).subscribe(e => {
      console.log(e)
    });
    location.reload()
  }

  filtrar() {
    if (this.filtro.trim() !== '') {
      this.pessoaService.searchByName(this.filtro).subscribe(
        (data) => {
          this.pessoas = data;
        })
    } else {
      this.pessoaService.findAllPessoas().subscribe((pessoa: Pessoa[]) => {
        this.pessoas = pessoa;
      });
    }
  }

  editar(id:number) {
    this.router.navigate(['/pessoa/editar/',id]);
  }

}
