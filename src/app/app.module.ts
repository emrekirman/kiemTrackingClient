import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuBarComponent } from './MenuBar/MenuBar.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { LoginComponent } from './Login/Login.component';
import { MainLayoutComponent } from './MainLayout/MainLayout.component';
import { OlcuBirimEkleComponent } from './Tanimlamalar/OlcuBirimEkle/OlcuBirimEkle.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { OlcuBirimDuzenleComponent } from './Tanimlamalar/OlcuBirimDuzenle/OlcuBirimDuzenle.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { StokTanimEkleComponent } from './Tanimlamalar/StokTanimEkle/StokTanimEkle.component';
import { StokTanimDuzenleComponent } from './Tanimlamalar/StokTanimDuzenle/StokTanimDuzenle.component';
import { CariTanimEkleComponent } from './Tanimlamalar/CariTanimEkle/CariTanimEkle.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { KullaniciEkleComponent } from './Tanimlamalar/KullaniciEkle/KullaniciEkle.component';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { LoginGuard } from '../app/Login/login.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CariTanimDuzenleComponent } from '../app/Tanimlamalar/CariTanimDuzenle/CariTanimDuzenle.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FaturaGirisComponent } from '../app/FaturaIslemleri/FaturaGiris/FaturaGiris.component';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FaturaListeComponent } from './FaturaIslemleri/FaturaListe/FaturaListe.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FaturaCikisComponent } from '../app/FaturaIslemleri/FaturaCikis/FaturaCikis.component';
import { StokMevcuduComponent } from '../app/Raporlar/StokMevcudu/StokMevcudu.component';
import { FaturaGirisDuzenleComponent } from '../app/FaturaIslemleri/FaturaGirisDuzenle/FaturaGirisDuzenle.component';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { MesajService } from 'src/Services/MesajServis/Mesaj.service';
import { FaturaCikisDuzenleComponent } from '../app/FaturaIslemleri/FaturaCikisDuzenle/FaturaCikisDuzenle.component';
import { LoginService } from 'src/Services/Login.service';
import { BaslangicComponent } from './Baslangic/Baslangic.component';
import { GirisCikislarComponent } from './Raporlar/GirisCikislar/GirisCikislar.component';
import { BirimEkleComponent } from './Tanimlamalar/BirimEkle/BirimEkle.component';
import { BirimDuzenleComponent } from './Tanimlamalar/BirimDuzenle/BirimDuzenle.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    LoginComponent,
    MainLayoutComponent,
    OlcuBirimEkleComponent,
    OlcuBirimDuzenleComponent,
    StokTanimEkleComponent,
    StokTanimDuzenleComponent,
    CariTanimEkleComponent,
    KullaniciEkleComponent,
    CariTanimDuzenleComponent,
    FaturaGirisComponent,
    FaturaListeComponent,
    FaturaCikisComponent,
    StokMevcuduComponent,
    FaturaGirisDuzenleComponent,
    FaturaCikisDuzenleComponent,
    BaslangicComponent,
    GirisCikislarComponent,
    BirimEkleComponent,
    BirimDuzenleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    FormsModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    TableModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    RippleModule,
    InputNumberModule,
    TabViewModule,
    DropdownModule,
    NgxSpinnerModule,
    ToastModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextareaModule,
    ContextMenuModule,
    SidebarModule,
    PanelMenuModule,
    MenuModule,
    TooltipModule,
    SplitButtonModule,
    InputMaskModule
  ],
  providers: [
    LoginGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MessageService,
    MesajService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
