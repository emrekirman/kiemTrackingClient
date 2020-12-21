import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Birim } from 'src/Model/Birim';
import { CariTanim } from 'src/Model/CariTanim';
import { DepoFis } from 'src/Model/DepoFis';
import { DepoOlcuBirim } from 'src/Model/DepoOlcuBirim';
import { FisHareketCikis } from 'src/Model/FisHareketCikis';
import { IslemCesidi } from 'src/Model/IslemCesidi';
import { StokTanim } from 'src/Model/StokTanim';
import { BirimService } from 'src/Services/Birim.service';
import { CariTanimService } from 'src/Services/CariTanim.service';
import { FaturaGirisService } from 'src/Services/FaturaGiris.service';
import { FisHareketGirisService } from 'src/Services/FisHareketGiris.service';
import { FisHareketCikisServiceService } from 'src/Services/FisHareketCikisService.service';
import { IslemCesidiService } from 'src/Services/IslemCesidi.service';
import { OlcuBirimService } from 'src/Services/OlcuBirim.service';
import { StokTanimService } from 'src/Services/StokTanim.service';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-FaturaCikis',
  templateUrl: './FaturaCikis.component.html',
  styleUrls: ['./FaturaCikis.component.scss']
})
export class FaturaCikisComponent implements OnInit {

  constructor(
    private service: FaturaGirisService,
    private spinner: NgxSpinnerService,
    private cariService: CariTanimService,
    private stokService: StokTanimService,
    private olcuService: OlcuBirimService,
    private islemCesidiService: IslemCesidiService,
    private mesajService: MesajService,
    private fisHareketGirisService: FisHareketGirisService,
    private birimService: BirimService,
    private fisHareketCikisService: FisHareketCikisServiceService,
    private router: Router,
    private title: Title
  ) { }

  fisModel: DepoFis = new DepoFis(false);
  fisHareketModel: FisHareketCikis = new FisHareketCikis();
  dayanakTarih: Date = new Date();
  fisTarih: Date = new Date();
  olusanFisId: number;

  cariler: CariTanim[] = [];
  filtreliCariler: CariTanim[] = [];

  stoklar: StokTanim[] = [];
  selectedStok: StokTanim = new StokTanim();
  filtreliStoklar: StokTanim[] = [];
  urunStokMiktar = 0;

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
    this.title.setTitle("Fatura Çıkış");
    this.getNewFisNo();
    this.getStoklar();
    this.getOlcuBirimler();
    this.getIslemCesileri();
    this.getBirimler();
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
  getBirimler() {
    this.spinner.show();
    this.birimService.getAll().subscribe(x => {
      this.birimler = x;
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

  stokTanimDegisti() {
    this.stokService.getStokMiktarById(this.selectedStok.id).subscribe(x => {
      this.urunStokMiktar = x;
    });
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
      this.spinner.hide();
      this.fisHareketModel.olcuBirim = x[0];
    });
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
    if (this.urunStokMiktar < this.fisHareketModel.miktar) {
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Çıkış yapılacak miktar stok miktarından fazla olamaz.");
    }
    else {
      if (this.eklenmisUrunKontrol(this.selectedStok.id)) {
        this.fisHareketModel.stokTanim = this.selectedStok;
        this.fisHareketModel.birim = this.fisModel.birim;
        this.fisModel.cikisList.push(this.fisHareketModel);
        this.fisModel.faturaTutar += this.fisHareketModel.tutar;
        this.fisHareketModel = new FisHareketCikis();
        this.fisHareketModel.olcuBirim = this.olcuBirimler[0];
      }
      else {
        this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Aynı üründen birden fazla çıkış yapılamaz. Lütfen çıkılacak ürünü tek seferde ekleyiniz.");
      }
    }
  }

  eklenmisUrunKontrol(stokId: number): boolean {
    let durum: boolean = true;
    this.fisModel.cikisList.forEach(x => {
      if (x.stokTanim.id == stokId) {
        durum = false;
      }
    });
    return durum;
  }

  fisEkle() {
    this.fisModel.fisTarih = this.fisTarih.toJSON();
    this.fisModel.dayanakTarih = this.dayanakTarih.toJSON();
    /*API'ye fiş gitti ve girişe göre uygun hareketler eklendi. Ardından uygun çıkışlar tekrar API'ye giderek
      fishareket tablosuna eklendi.
    */
    this.spinner.show();
    this.service.createCikisFis(this.fisModel).subscribe(x => {
      //burada tifin id si dönüyor ilerde edit sayfasına yönlendiricez.
      // this.fisHareketGiris(x.cikisList, x);
      this.olusanFisId = x;
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Fatura Çıkışı Yapıldı");
      this.router.navigate(["index/faturaCikisDuzenle/" + this.olusanFisId]);
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.hataMesajı();
    })
  }


  fisHareketGiris(cikisList: FisHareketCikis[], model: DepoFis) {
    cikisList.forEach(item => {
      console.log(item);

      item.depoFis = model;
    });
    this.fisHareketCikisService.createAll(cikisList).subscribe(x => {
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Fatura Girişi Yapıldı");
    }, err => {
      this.hataMesajı();
    })
  }
  hataMesajı() {
    this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Fatura Girişi Yapılamadı");
  }


}
