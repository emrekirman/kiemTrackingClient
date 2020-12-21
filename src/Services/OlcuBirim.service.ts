import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DepoOlcuBirim } from 'src/Model/DepoOlcuBirim';
import { HttpReq } from 'src/Model/HttpReq';

@Injectable({
  providedIn: 'root'
})
export class OlcuBirimService {

  constructor(private http: HttpClient) { }

  httpModel: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");

  addOlcuBirim(model: DepoOlcuBirim) {
    return this.http.post(this.httpModel.getRequestUrl('rest/depoOlcuBirim/ekle'), model, { headers: { "token": this.token } });
  };

  getOlcuBirims() {
    return this.http.get<DepoOlcuBirim[]>(this.httpModel.getRequestUrl('rest/depoOlcuBirim/getAll'), { headers: { "token": this.token } });
  }

  getById(id: number) {
    return this.http.get<DepoOlcuBirim>(this.httpModel.getRequestUrl('rest/depoOlcuBirim/getById/' + id), { headers: { "token": this.token } });
  }

  update(model: DepoOlcuBirim) {
    return this.http.post(this.httpModel.getRequestUrl('rest/depoOlcuBirim/update'), model, { headers: { "token": this.token } });
  }

  delete(id: number) {
    return this.http.get(this.httpModel.getRequestUrl('rest/depoOlcuBirim/delete/' + id), { headers: { "token": this.token } });
  }

}
