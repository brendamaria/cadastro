import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Router } from '@angular/router';
import { EndecoService } from '../endeco.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent {

  pessoas: any;

  idEndereco: any[];

  id: number;
  filtro:string;

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

  selectProduct() {
    this.idEndereco.forEach(x => {
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
    this.pessoaService.findByNome(this.filtro).subscribe((pessoa: any) => {
      this.pessoas = pessoa;
    });
  }
}
