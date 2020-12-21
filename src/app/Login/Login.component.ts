import { Component, OnInit } from '@angular/core';
import { Kullanici } from 'src/Model/Kullanici';
import { LoginService } from 'src/Services/Login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private mesaj: MessageService
  ) { }

  model: Kullanici = new Kullanici();
  calismaYili: number = new Date().getFullYear();
  ngOnInit() {

  }

  giris(form: NgForm) {
    this.spinner.show();
    this.model.sifre = sha256(this.model.sifre);
    this.loginService.startSession(this.model, this.calismaYili).subscribe(x => {
      if (x != null || x != undefined) {
        this.loginService.isLogin = true;
        this.loginService.loginModel = x.body;
        localStorage.setItem("session", x.body.ad + " " + x.body.soyad);
        localStorage.setItem("kullaniciId", x.body.id.toString());
        localStorage.setItem("kullaniciad", x.body.kullaniciAd);
        localStorage.setItem("calismaYili", this.calismaYili.toString());
        localStorage.setItem("token", x.headers.get("authorization"));
        localStorage.setItem("yetkiId", x.body.yetki.id.toString());
        this.route.navigate(["index/baslangic"]);
        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      this.mesaj.add({ severity: 'error', summary: 'Hata', detail: 'Hatalı Giriş.', key: 'toast' });
    })
  }


  yilDegis() {
    this.calismaYili = this.calismaYili < 2020 ? 2020 : this.calismaYili;
  }

}
