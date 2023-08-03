import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  readonly url = "api/pessoas";


  findAllPessoas(): Observable<any[]> {
    return this.http.get<any>(`${this.url}`);
  }

  constructor(public http: HttpClient) { }

  save(pessoa: any, e: any) {
    pessoa.enderecos = e;
    return this.http.post(this.url, pessoa);
  }

  edit(pessoa: any, e: any) {
    pessoa.enderecos = e;
    return this.http.put(`${this.url}`, pessoa);
  }

  find(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  findByNome(nome: string): Observable<any[]> {
    return this.http.get<any>(`${this.url}/busca/${nome}`)
  }

  searchByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/search?name=${name}`);
  }


}
