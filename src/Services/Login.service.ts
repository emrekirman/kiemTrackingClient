import { Injectable } from '@angular/core';
import { Kullanici } from 'src/Model/Kullanici';
import { HttpClient } from '@angular/common/http';
import { HttpReq } from 'src/Model/HttpReq';
import { KullaniciService } from './Kullanici.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private kullaniciService: KullaniciService
  ) { }

  isLogin: boolean = false;
  loginModel: Kullanici = new Kullanici();
  httpModel: HttpReq = new HttpReq();
  yil: number;
  startSession(model: Kullanici, yil: number) {
    return this.http.get<Kullanici>(this.httpModel.getRequestUrl('rest/kullanici/sessionStart?kadi=' + model.kullaniciAd + '&sifre=' + model.sifre + '&yil=' + yil), { observe: 'response' });
  }

  destroySession() {
    this.kullaniciService.destroySession().subscribe(x => {
      this.isLogin = false;
      this.loginModel = new Kullanici();
      localStorage.clear();
    })
  }

}
