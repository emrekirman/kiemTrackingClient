import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Login/Login.component';
import { MainLayoutComponent } from './MainLayout/MainLayout.component';
import { OlcuBirimEkleComponent } from './Tanimlamalar/OlcuBirimEkle/OlcuBirimEkle.component';
import { StokTanimEkleComponent } from './Tanimlamalar/StokTanimEkle/StokTanimEkle.component';
import { CariTanimEkleComponent } from './Tanimlamalar/CariTanimEkle/CariTanimEkle.component';
import { KullaniciEkleComponent } from './Tanimlamalar/KullaniciEkle/KullaniciEkle.component';
import { LoginGuard } from './Login/login.guard';
import { FaturaGirisComponent } from './FaturaIslemleri/FaturaGiris/FaturaGiris.component';
import { FaturaListeComponent } from './FaturaIslemleri/FaturaListe/FaturaListe.component';
import { FaturaCikisComponent } from './FaturaIslemleri/FaturaCikis/FaturaCikis.component';
import { StokMevcuduComponent } from './Raporlar/StokMevcudu/StokMevcudu.component';
import { FaturaGirisDuzenleComponent } from './FaturaIslemleri/FaturaGirisDuzenle/FaturaGirisDuzenle.component';
import { FaturaCikisDuzenleComponent } from './FaturaIslemleri/FaturaCikisDuzenle/FaturaCikisDuzenle.component';
import { BaslangicComponent } from './Baslangic/Baslangic.component';
import { GirisCikislarComponent } from './Raporlar/GirisCikislar/GirisCikislar.component';
import { BirimEkleComponent } from './Tanimlamalar/BirimEkle/BirimEkle.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'index', component: MainLayoutComponent, canActivate: [LoginGuard], children: [
      { path: 'baslangic', component: BaslangicComponent, canActivate: [LoginGuard] },
      { path: 'olcuBirimEkle', component: OlcuBirimEkleComponent, canActivate: [LoginGuard] },
      { path: 'stokTanimEkle', component: StokTanimEkleComponent, canActivate: [LoginGuard] },
      { path: 'cariTanimEkle', component: CariTanimEkleComponent, canActivate: [LoginGuard] },
      { path: 'kullaniciEkle', component: KullaniciEkleComponent, canActivate: [LoginGuard] },
      { path: 'birimEkle', component: BirimEkleComponent, canActivate: [LoginGuard] },
      { path: 'faturaGiris', component: FaturaGirisComponent, canActivate: [LoginGuard] },
      { path: 'faturaCikis', component: FaturaCikisComponent, canActivate: [LoginGuard] },
      { path: 'faturaGirisListe/:giris', component: FaturaListeComponent, canActivate: [LoginGuard] },
      { path: 'stokMevcudu', component: StokMevcuduComponent, canActivate: [LoginGuard] },
      { path: 'faturaGirisDuzenle/:id', component: FaturaGirisDuzenleComponent, canActivate: [LoginGuard] },
      { path: 'faturaCikisDuzenle/:id', component: FaturaCikisDuzenleComponent, canActivate: [LoginGuard] },
      { path: 'girisCikislar', component: GirisCikislarComponent, canActivate: [LoginGuard] }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
