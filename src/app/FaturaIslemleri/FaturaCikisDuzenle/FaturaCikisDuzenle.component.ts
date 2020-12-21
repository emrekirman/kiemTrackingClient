import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Birim } from 'src/Model/Birim';
import { CariTanim } from 'src/Model/CariTanim';
import { DepoFis } from 'src/Model/DepoFis';
import { DepoOlcuBirim } from 'src/Model/DepoOlcuBirim';
import { FisHareketCikis } from 'src/Model/FisHareketCikis';
import { FisHareketGiris } from 'src/Model/FisHareketGiris';
import { IslemCesidi } from 'src/Model/IslemCesidi';
import { StokTanim } from 'src/Model/StokTanim';
import { CariTanimService } from 'src/Services/CariTanim.service';
import { FaturaGirisService } from 'src/Services/FaturaGiris.service';
import { FisHareketGirisService } from 'src/Services/FisHareketGiris.service';
import { IslemCesidiService } from 'src/Services/IslemCesidi.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { OlcuBirimService } from 'src/Services/OlcuBirim.service';
import { StokTanimService } from 'src/Services/StokTanim.service';
import { MesajService } from '../../../Services/MesajServis/Mesaj.service';
import { FisHareketCikisServiceService } from '../../.././Services/FisHareketCikisService.service';
import { BirimService } from 'src/Services/Birim.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-FaturaCikisDuzenle',
  templateUrl: './FaturaCikisDuzenle.component.html',
  styleUrls: ['./FaturaCikisDuzenle.component.css'],
  providers: [ConfirmationService]
})
export class FaturaCikisDuzenleComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private cariService: CariTanimService,
    private stokService: StokTanimService,
    private olcuService: OlcuBirimService,
    private islemCesidiService: IslemCesidiService,
    // private fisHareketGirisService: FisHareketGirisService,
    private activatedRoute: ActivatedRoute,
    private faturaGirisService: FaturaGirisService,
    private confirm: ConfirmationService,
    private mesajService: MesajService,
    private fisHareketCikisService: FisHareketCikisServiceService,
    private birimService: BirimService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Fatura Çıkışı Düzenle");
    this.getFis();
    // this.getCariler();
    this.getStoklar();
    this.getOlcuBirimler();
    this.getIslemCesileri();
    this.getBirimler();
  }
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
  fisModel: DepoFis = new DepoFis(false);
  fisHareketModel: FisHareketCikis = new FisHareketCikis();
  fisId: number;
  fisTutar: number = 0;

  dayanakTarih: Date = new Date();
  fisTarih: Date = new Date();

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

  splitMenuItems = [
    {
      label: 'İptal', icon: 'pi pi-times', command: () => {
        this.fisHareketDuzenleIptal();
      }
    }
  ];

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
      this.fisHareketModel.olcuBirim = this.olcuBirimler[0];
    });
  }

  getBirimler() {
    this.spinner.show();
    this.birimService.getAll().subscribe(x => {
      this.birimler = x;
      this.spinner.hide();
    });
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

  faturaTutarHesapla(list: FisHareketCikis[]): number {
    let toplam: number = 0;
    list.forEach(item => {
      toplam += item.tutar;
    });
    return toplam;
  }

  getFis() {
    this.activatedRoute.params.subscribe(x => {
      this.spinner.show();
      this.fisId = x["id"];
      this.faturaGirisService.getById(this.fisId).subscribe(a => {
        this.fisModel = a;
        this.fisTutar = this.faturaTutarHesapla(this.fisModel.cikisList);
        this.dayanakTarih = new Date(a.dayanakTarih);//Component üzerinde göstermek için date parse ettik.
        this.fisTarih = new Date(a.fisTarih);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      })
    })
  }

  hareketDuzenle: boolean = false;
  fisHareketDuzenle(model: FisHareketCikis) {
    this.fisHareketModel = model;
    this.selectedStok = model.stokTanim;
    this.hareketDuzenle = true;
  }

  fisHareketDuzenleIptal() {
    this.fisHareketModel = new FisHareketCikis();
    this.selectedStok = null;
    this.hareketDuzenle = false;
  }

  updateFisHareket() {
    this.fisHareketModel.depoFis = new DepoFis(false);
    this.fisHareketModel.depoFis = this.fisModel;
    this.fisHareketModel.depoFis.cikisList = [];
    this.fisHareketModel.stokTanim = this.selectedStok;
    this.spinner.show();
    this.fisHareketCikisService.update(this.fisHareketModel).subscribe(x => {
      this.spinner.hide();
      this.fisModel = x;
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Değişiklikler Kayıt Edildi.");
    }, err => {
      console.log(err);

      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir Sorun Oluştu");
    });
  }

  deleteFisHareket(id: number) {
    this.spinner.show();
    this.fisHareketCikisService.delete(id).subscribe(x => {
      this.spinner.hide();
      this.getFis();
      this.selectedStok = new StokTanim();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Silme Başarılı.");
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir Sorun Oluştu.");
    })
  }

  confirmDialog(id: number) {
    this.confirm.confirm({
      message: "Silmek istediğinize emin misiniz ?",
      accept: () => {
        this.deleteFisHareket(id);
      },
      rejectLabel: "Hayır",
      acceptLabel: "Evet"
    })
  }

  createFisHareket() {
    if (this.urunStokMiktar < this.fisHareketModel.miktar) {
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Çıkış yapılacak miktar stok miktarından fazla olamaz.");
    }
    else {
      this.fisHareketModel.depoFis = this.fisModel;
      this.fisHareketModel.depoFis.cikisList = [];
      this.fisHareketModel.stokTanim = this.selectedStok;
      // this.fisHareketModel.cariTanim = this.fisModel.cariTanim;
      this.spinner.show();
      this.fisHareketCikisService.create(this.fisHareketModel).subscribe(x => {
        this.spinner.hide();
        this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Ekleme Başarılı");
        this.getFis();
      }, err => {
        this.spinner.hide();
        this.getFis();
        this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir Sorun Oluştu. Ürüne ait bir giriş olmayabilir");
      })
    }
  }

  kaydet() {
    this.spinner.show();
    this.fisModel.dayanakTarih = moment(this.dayanakTarih).format("YYYY-MM-DD");
    this.fisModel.fisTarih = moment(this.fisTarih).format("YYYY-MM-DD");
    console.log(this.fisModel.fisTarih);

    this.faturaGirisService.update(this.fisModel).subscribe(x => {
      this.fisModel = x;
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Basarili, "Durum", "Kayıt işlemi başarılı.");
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu.");
    })
  }

}
