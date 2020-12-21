import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FisHareketDto } from 'src/Dto/FisHareketDto';
import { StokTanim } from 'src/Model/StokTanim';
import { FileDownloadService } from 'src/Services/FileService/FileDownload.service';
import { KullaniciService } from 'src/Services/Kullanici.service';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { MesajTipi } from 'src/Services/MesajServis/MesajTipi.enum';
import { StokTanimService } from 'src/Services/StokTanim.service';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-GirisCikislar',
  templateUrl: './GirisCikislar.component.html',
  styleUrls: ['./GirisCikislar.component.scss']
})
export class GirisCikislarComponent implements OnInit {

  constructor(
    private stokService: StokTanimService,
    private spinner: NgxSpinnerService,
    private mesajService: MesajService,
    private fileDownloadService: FileDownloadService,
    private title: Title
  ) { }

  ngOnInit() {
    this.getStoklar();
    this.title.setTitle("Giriş Çıkışlar");
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

  stoklar: StokTanim[] = [];
  selectedStok: StokTanim = new StokTanim();
  filtreliStoklar: StokTanim[] = [];

  data: FisHareketDto[] = [];

  baslangicTarih = new Date(localStorage.getItem("calismaYili") + "-01-01");
  bitisTarih = new Date(localStorage.getItem("calismaYili") + "-12-31");

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

  getStoklar() {
    this.spinner.show();
    this.stokService.getStokTanims().subscribe(x => {
      this.stoklar = x;
      this.spinner.hide();
    })
  }

  ara() {
    this.spinner.show();
    this.stokService.getGirisCikislar(this.selectedStok.id, moment(this.baslangicTarih).format("YYYY-MM-DD"), moment(this.bitisTarih).format("YYYY-MM-DD")).subscribe(x => {
      this.data = x;
      this.spinner.hide();
    }, err => {
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Bir sorun oluştu.");
      this.spinner.hide();
    })
  }

  download() {
    this.spinner.show();
    this.stokService.downloadGirisCikislar(this.data, moment(this.baslangicTarih).format("YYYY-MM-DD"), moment(this.bitisTarih).format("YYYY-MM-DD")).subscribe(x => {
      this.fileDownloadService.downloadToLocal(x, "GirişÇıkışlar.xlsx");
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.mesajService.mesajBas("toast", MesajTipi.Hata, "Durum", "Rapor indirilirken bir sorun oluştu");
    })
  }

}
