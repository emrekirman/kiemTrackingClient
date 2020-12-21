import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { FaturaListeVM } from 'src/Dto/FaturaListeVM';
import { DepoFis } from 'src/Model/DepoFis';
import { FaturaGirisService } from 'src/Services/FaturaGiris.service';

@Component({
  selector: 'app-FaturaListe',
  templateUrl: './FaturaListe.component.html',
  styleUrls: ['./FaturaListe.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FaturaListeComponent implements OnInit {
  constructor(
    private faturaService: FaturaGirisService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService,
    private title: Title
  ) { }

  data: FaturaListeVM[] = [];
  selectedDepoFis: DepoFis = new DepoFis(true);
  contextMenuItems: MenuItem[] = [];//Sağ tıkladığmızda açılan menü

  ngOnInit() {
    this.title.setTitle("Fatura Listesi");
    this.contextMenuItems = [
      {
        label: "Düzenle", icon: 'pi pi-fw pi-pencil', command: () => {
          if (this.selectedDepoFis.giris) {
            this.route.navigate(['index/faturaGirisDuzenle/' + this.selectedDepoFis.id])
          }
          else {
            this.route.navigate(['index/faturaCikisDuzenle/' + this.selectedDepoFis.id])
          }
        }
      },
      { label: "Sil", icon: 'pi pi-fw pi-trash', command: () => { } }
    ];
    this.spinner.show()
    this.activatedRoute.params.subscribe(x => {
      let giris = x["giris"];
      this.faturaService.getAll(giris).subscribe(x => {
        this.data = x;
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
      })
    },err=>{
      this.spinner.hide();
    });
  }

}
