import { Yetki } from "./Yetki";

export class Kullanici {

    constructor() {
        this.id = 0;
        this.kullaniciAd = "";
        this.ad = "";
        this.soyad = "";
        this.yetki = null;
        this.sifre = "";
    }

    id: number;
    kullaniciAd: string;
    ad: string;
    soyad: string;
    eklenmeTarih: number;
    yetki: Yetki;
    sifre: string;
}
