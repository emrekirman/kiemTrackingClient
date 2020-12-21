import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kullanici } from '../Model/Kullanici';
import { HttpReq } from 'src/Model/HttpReq';

@Injectable({
  providedIn: 'root'
})
export class KullaniciService {

  constructor(
    private http: HttpClient
  ) { }

  httpModel: HttpReq = new HttpReq();
  token: string = localStorage.getItem("token");

  getKullanicis() {
    return this.http.get<Kullanici[]>(this.httpModel.getRequestUrl('rest/kullanici/getAll'), { headers: { "token": this.token } });
  }

  startSession(model: Kullanici) {
    return this.http.get<Kullanici>(this.httpModel.getRequestUrl('rest/kullanici/sessionStart') + '/kadi=' + model.kullaniciAd + '&sifre=' + model.soyad);
  }

  destroySession() {
    return this.http.get<boolean>(this.httpModel.getRequestUrl('rest/kullanici/destroySession'), { headers: { "token": this.token } })
  }
}
