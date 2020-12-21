import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoginService } from 'src/Services/Login.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ERP';

  constructor(
    private primengConfig: PrimeNGConfig,
    private service: LoginService,
    private spinner: NgxSpinnerService
  ) { }

  maxNumber: number = 2020;
  minNumber: number = 2018;
  data: number = this.minNumber;
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.service.yil = this.data;
  }

  degisiklik() {
    this.spinner.show()
    this.service.yil = this.data;
    this.spinner.hide();
  }
}
