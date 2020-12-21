import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepoFis } from 'src/Model/DepoFis';
import { FisHareketCikis } from 'src/Model/FisHareketCikis';
import { HttpReq } from 'src/Model/HttpReq';

@Injectable({
  providedIn: 'root'
})
export class FisHareketCikisServiceService {

  constructor(
    private http: HttpClient
  ) { }

  httpModel: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");

  createAll(list: FisHareketCikis[]) {
    return this.http.post(this.httpModel.getRequestUrl('rest/fisHareketCikis/createAll'), list, { headers: { "token": this.token } });
  }

  update(model: FisHareketCikis) {
    return this.http.post<DepoFis>(this.httpModel.getRequestUrl('rest/fisHareketCikis/update'), model, { headers: { "token": this.token } });
  }

  delete(id: number) {
    return this.http.get<boolean>(this.httpModel.getRequestUrl('rest/fisHareketCikis/delete/' + id), { headers: { "token": this.token } });
  }

  create(model: FisHareketCikis) {
    return this.http.post<FisHareketCikis>(this.httpModel.getRequestUrl('rest/fisHareketCikis/create'), model, { headers: { "token": this.token } });
  }

}
