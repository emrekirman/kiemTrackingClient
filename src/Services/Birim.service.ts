import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Birim } from 'src/Model/Birim';
import { HttpReq } from 'src/Model/HttpReq';

@Injectable({
  providedIn: 'root'
})
export class BirimService {

  constructor(
    private http: HttpClient
  ) { }
  httpReq: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");

  getAll() {
    return this.http.get<Birim[]>(this.httpReq.getRequestUrl('rest/birim/getAll'), { headers: { "token": this.token } });
  }

  delete(id: number) {
    return this.http.get<boolean>(this.httpReq.getRequestUrl('rest/birim/delete/' + id), { headers: { "token": this.token } });
  }

  update(model: Birim) {
    return this.http.post<boolean>(this.httpReq.getRequestUrl('rest/birim/update'), model, { headers: { "token": this.token } });
  }

  create(model: Birim) {
    return this.http.post<boolean>(this.httpReq.getRequestUrl('rest/birim/ekle'), model, { headers: { "token": this.token } })
  }

  getById(id: number) {
    return this.http.get<Birim>(this.httpReq.getRequestUrl('rest/birim/getById/' + id), { headers: { "token": this.token } });
  }
}
