import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CariTanim } from '../Model/CariTanim';
import { HttpReq } from '../Model/HttpReq';

@Injectable({
  providedIn: 'root'
})
export class CariTanimService {

  constructor(private http: HttpClient) { }
  httpModel: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");


  getAll() {
    return this.http.get<CariTanim[]>(this.httpModel.getRequestUrl('rest/cariTanim/getAll'), { headers: { "token": this.token } });
  }

  addCariTanim(model: CariTanim) {
    return this.http.post(this.httpModel.getRequestUrl('rest/cariTanim/ekle'), model, { headers: { "token": this.token } });
  }

  getById(id: number) {
    return this.http.get<CariTanim>(this.httpModel.getRequestUrl('rest/cariTanim/getById/' + id), { headers: { "token": this.token } })
  }

  update(model: CariTanim) {
    return this.http.post(this.httpModel.getRequestUrl('rest/cariTanim/update'), model, { headers: { "token": this.token } });
  }

  delete(id: number) {
    return this.http.get(this.httpModel.getRequestUrl('rest/cariTanim/delete/' + id), { headers: { "token": this.token } });
  }

}
