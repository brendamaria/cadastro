import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaComponent } from './pessoa/pessoa.component';
import { AddPessoaComponent } from './pessoa/add-pessoa/add-pessoa.component';

export const routes: Routes = [
  { path: '',  component: PessoaComponent },
  { path: 'add',  component: AddPessoaComponent },
  { path: 'pessoa/editar/:id', component: AddPessoaComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
