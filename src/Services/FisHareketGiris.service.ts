import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepoFis } from 'src/Model/DepoFis';
import { HttpReq } from 'src/Model/HttpReq';
import { FisHareketGiris } from '../Model/FisHareketGiris';

@Injectable({
  providedIn: 'root'
})
export class FisHareketGirisService {

  constructor(
    private http: HttpClient
  ) { }

  httpModel: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");

  createAll(girisList: FisHareketGiris[]) {
    return this.http.post(this.httpModel.getRequestUrl('rest/fisHareketGiris/createAll'), girisList, { headers: { "token": this.token } });
  }

  update(model: FisHareketGiris) {
    return this.http.post<DepoFis>(this.httpModel.getRequestUrl('rest/fisHareketGiris/update'), model, { headers: { "token": this.token } });
  }

  delete(id: number) {
    return this.http.get<boolean>(this.httpModel.getRequestUrl('rest/fisHareketGiris/delete/' + id), { headers: { "token": this.token } })
  }

  create(model: FisHareketGiris) {
    return this.http.post<number>(this.httpModel.getRequestUrl('rest/fisHareketGiris/create'), model, { headers: { "token": this.token } });
  }

}
