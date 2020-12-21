import { Component, OnInit } from '@angular/core';
import { KullaniciService } from '../../../Services/Kullanici.service';
import { YetkiService } from '../../../Services/Yetki.service';
import { Kullanici } from 'src/Model/Kullanici';
import { Yetki } from 'src/Model/Yetki';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-KullaniciEkle',
  templateUrl: './KullaniciEkle.component.html',
  styleUrls: ['./KullaniciEkle.component.scss']
})
export class KullaniciEkleComponent implements OnInit {

  constructor(
    private service: KullaniciService,
    private yetkiService: YetkiService,
    private mesajServis: MesajService,
    private title: Title
  ) { }

  data: Kullanici[] = [];
  model: Kullanici = new Kullanici();
  yetkiler: Yetki[] = [];
  yetkiModel: Yetki = new Yetki();
  ngOnInit() {
    this.verileriGetir();
    this.yetkileriGetir();
    this.title.setTitle("Kullanıcı Ekle");
  }

  kullaniciEkle() {

  }

  verileriGetir() {
    this.service.getKullanicis().subscribe(x => {
      this.data = x;
    })
  }

  yetkileriGetir() {
    this.yetkiService.getYetkis().subscribe(x => {
      this.yetkiler = x;
    }, err => {
      console.log(err);
      
      this.mesajServis.mesajBas("toast",MesajTipi.Hata,"Durum","Yetki tanımları getirilemedi.");
    })
  }

  degis() {
    this.model.yetki = this.yetkiModel;
  }

}
