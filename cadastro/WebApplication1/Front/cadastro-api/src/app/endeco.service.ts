import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndecoService {

  readonly url = "api/enderecoes";

  constructor(public http: HttpClient) { }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
