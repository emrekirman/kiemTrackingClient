import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/Services/Login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-MenuBar',
  templateUrl: './MenuBar.component.html',
  styleUrls: ['./MenuBar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent implements OnInit {

  constructor(private loginService: LoginService, private route: Router) { }

  items: MenuItem[];
  adSoyad: string;
  visibleSidebar1: boolean = false;

  ngOnInit() {
    this.items = [
      {
        label: "Başlangıç",
        icon: 'pi pi-fw pi-home',
        routerLink: 'baslangic'
      },

      {
        label: 'Fatura İşlemleri',
        icon: 'pi pi-copy',
        items: [
          {
            label: 'Fatura Girişi',
            icon: 'pi pi-sign-in',
            items: [
              {
                label: 'Yeni Kayıt',
                icon: 'pi pi-plus',
                routerLink: 'faturaGiris'
              },
              {
                label: 'Fatura Listesi',
                icon: 'pi pi-list',
                routerLink: 'faturaGirisListe/true'
              }
            ]

          },
          {
            label: 'Fatura Çıkışı',
            icon: 'pi pi-sign-out',
            items: [
              {
                label: "Yeni Kayıt",
                icon: 'pi pi-plus',
                routerLink: 'faturaCikis'
              },
              {
                label: "Fatura Listesi",
                icon: "pi pi-list",
                routerLink: 'faturaGirisListe/false'
              }
            ]
          }
        ]
      },
      {
        label: 'Raporlar',
        icon: 'pi pi-file-excel',
        items: [
          {
            label: 'Stok Mevcudu',
            icon: 'pi pi-fw pi-pencil',
            routerLink: 'stokMevcudu'
          },
          {
            label: 'Giriş Çıkışlar',
            icon: 'pi pi-chart-line',
            routerLink: 'girisCikislar'
          }
        ]
      }
    ];
    if (localStorage.getItem("session") != null) {
      let item: MenuItem = {
        label: 'Çıkış',
        icon: 'pi pi-fw pi-power-off',
        command: (event: Event) => {
          this.loginService.destroySession();
          this.route.navigate(["login"]);
        }
      }
      this.items.push(item);
      this.adSoyad = localStorage.getItem("session");
    }

    //Tanımlama ve düzenleme işlemleri sadece yetkili kullanıcılar tarafından yapılabilir.
    if (localStorage.getItem("yetkiId") == "1") {      
      let item: MenuItem = {
        label: 'Tanımlamalar',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Stok Kodu Tanımla',
            icon: 'pi pi-plus pi-align-left',
            routerLink: 'stokTanimEkle'
          },
          {
            label: 'Ölçü Birimi Tanımla',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'olcuBirimEkle'
          },
          {
            label: 'Birim Tanımla',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'birimEkle'
          },
          {
            label: 'Cari Tanımla',
            icon: 'pi pi-fw pi-user',
            routerLink: 'cariTanimEkle'
          },
          {
            label: 'Kullanıcı/Yetki Tanımla',
            icon: 'pi pi-fw pi-user',
            routerLink: 'kullaniciEkle'
          }
        ]
      };
      this.items.splice(1,0,item);
    }
  }



  degistir() {
    this.visibleSidebar1 = !this.visibleSidebar1;
  }

}
