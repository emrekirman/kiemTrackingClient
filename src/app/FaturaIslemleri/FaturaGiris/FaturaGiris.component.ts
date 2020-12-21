import { Component, OnInit } from '@angular/core';
import { FaturaGirisService } from '../../../Services/FaturaGiris.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepoFis } from '../../../Model/DepoFis';
import { FisHareketGiris } from 'src/Model/FisHareketGiris';
import { CariTanim } from 'src/Model/CariTanim';
import { CariTanimService } from 'src/Services/CariTanim.service';
import { StokTanimService } from 'src/Services/StokTanim.service';
import { StokTanim } from 'src/Model/StokTanim';
import { DepoOlcuBirim } from 'src/Model/DepoOlcuBirim';
import { OlcuBirimService } from 'src/Services/OlcuBirim.service';
import { IslemCesidi } from 'src/Model/IslemCesidi';
import { IslemCesidiService } from '../../../Services/IslemCesidi.service';
import { MessageService } from 'primeng/api';
import { FisHareketGirisService } from '../../../Services/FisHareketGiris.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Birim } from 'src/Model/Birim';
import { BirimService } from '../../../Services/Birim.service';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-FaturaGiris',
  templateUrl: './FaturaGiris.component.html',
  styleUrls: ['./FaturaGiris.component.scss']
})
export class FaturaGirisComponent implements OnInit {

  constructor(
    private service: FaturaGirisService,
    private spinner: NgxSpinnerService,
    private cariService: CariTanimService,
    private stokService: StokTanimService,
    private olcuService: OlcuBirimService,
    private islemCesidiService: IslemCesidiService,
    private mesajService: MesajService,
    private fisHareketGirisService: FisHareketGirisService,
    private router: Router,
    private title: Title
  ) { }

  fisModel: DepoFis = new DepoFis(true);
  fisHareketModel: FisHareketGiris = new FisHareketGiris();
  dayanakTarih: Date = new Date();
  fisTarih: Date = new Date();
  olusanFisId: number = 0;

  cariler: CariTanim[] = [];
  filtreliCariler: CariTanim[] = [];

  stoklar: StokTanim[] = [];
  selectedStok: StokTanim = new StokTanim();
  filtreliStoklar: StokTanim[] = [];

  olcuBirimler: DepoOlcuBirim[] = [];

  islemCesidleri: IslemCesidi[] = [];
  filtreliIslemCesidleri: IslemCesidi[] = [];

  birimler: Birim[] = [];
  filtreliBirimler: Birim[] = [];
  selectedBirim: Birim = new Birim();
  en = {
    firstDayOfWeek: 0,
    dayNames: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
    dayNamesShort: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cumr", "Paz"],
    dayNamesMin: ["Pz", "Sl", "Çr", "Pr", "Cu", "Cm", "Pa"],
    monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık  "],
    monthNamesShort: ["Ock", "Şbt", "Mrt", "Nsn", "Mys", "Hzr", "Tem", "Agu", "Eyl", "Ekm", "Ksm", "Arl"],
    today: 'Bugün',
    clear: 'Temizle',
    dateFormat: 'mm/dd/yy',
    weekHeader: 'Hafta'
  };

  ngOnInit() {
    this.title.setTitle("Fatura Girişi");
    this.getNewFisNo();
    this.getCariler();
    this.getStoklar();
    this.getOlcuBirimler();
    this.getIslemCesileri();
  }

  getNewFisNo() {
    this.spinner.show();
    this.service.getFisNo().subscribe(x => {
      this.fisModel.fisNo = x;
      this.spinner.hide();
    })
  }

  getCariler() {
    this.spinner.show();
    this.cariService.getAll().subscribe(x => {
      this.cariler = x;
      this.spinner.hide();
    });
  }

  getStoklar() {
    this.spinner.show();
    this.stokService.getStokTanims().subscribe(x => {
      this.stoklar = x;
      this.spinner.hide();
    })
  }

  getIslemCesileri() {
    this.spinner.show();
    this.islemCesidiService.getAll().subscribe(x => {
      this.islemCesidleri = x;
      this.spinner.hide();
    })
  }

  getOlcuBirimler() {
    this.spinner.show();
    this.olcuService.getOlcuBirims().subscribe(x => {
      this.olcuBirimler = x;
      this.fisHareketModel.olcuBirim = this.olcuBirimler[0];
      this.spinner.hide();
    })
  }

  search(event) {
    let filtered: CariTanim[] = [];
    let query = event.query;
    for (let i = 0; i < this.cariler.length; i++) {
      let item = this.cariler[i];
      if (item.cariAd.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filtreliCariler = filtered;
  }
  searchStok(event) {
    let filtered: StokTanim[] = [];
    let query = event.query;
    for (let i = 0; i < this.stoklar.length; i++) {
      let item = this.stoklar[i];
      if (item.tanim.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filtreliStoklar = filtered;
  }

  searchIslemCesidi(event) {
    let filtered: IslemCesidi[] = [];
    let query = event.query;
    for (let i = 0; i < this.islemCesidleri.length; i++) {
      let item = this.islemCesidleri[i];
      if (item.tanim.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filtreliIslemCesidleri = filtered;
  }

  searchBirim(event) {
    let filtered: Birim[] = [];
    let query = event.query;
    for (let i = 0; i < this.birimler.length; i++) {
      let item = this.birimler[i];
      if (item.tanim.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filtreliBirimler = filtered;
  }

  tutarHesapla() {
    this.fisHareketModel.tutar = this.fisHareketModel.birimFiyat * this.fisHareketModel.miktar;
  }

  urunEkle() {
    console.log("asdasd");

    this.fisHareketModel.stokTanim = this.selectedStok;
    this.fisHareketModel.cariTanim = this.fisModel.cariTanim;
    this.fisModel.girisList.push(this.fisHareketModel);
    this.fisModel.faturaTutar += this.fisHareketModel.tutar;
    this.fisHareketModel = new FisHareketGiris();
    this.fisHareketModel.olcuBirim = this.olcuBirimler[0];
  }

  fisEkle() {
    this.fisModel.fisTarih = this.fisTarih.toJSON();
    this.fisModel.dayanakTarih = this.dayanakTarih.toJSON();
    this.spinner.show();
    this.service.createFis(this.fisModel).subscribe(x => {
      this.olusanFisId = x.id;
      this.spinner.show();
      this.fisHareketGiris(this.fisModel.girisList, x);
    }, err => {
      this.spinner.hide();
      this.hataMesajı();
    })
  }


  fisHareketGiris(girisList: FisHareketGiris[], model: DepoFis) {
    girisList.forEach(item => {
      item.depoFis = model;
    });
    this.fisHareketGirisService.createAll(girisList).subscribe(x => {
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Fatura Girişi Yapıldı.");
      this.router.navigate(["index/faturaGirisDuzenle/" + this.olusanFisId]);
    }, err => {
      this.spinner.hide();
      this.hataMesajı();
    })
  }
  hataMesajı() {
    this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Fatura Girişi Yapılamadı.");
  }
}