import { KullaniciIslemTurleri } from './KullaniciIslemTurleri';
import { Kullanici } from './Kullanici';

export class KullaniciIslem {
    constructor() {
        this.id = 0;
        this.islemTarih = "";
        this.kullaniciIslemTurleri = new KullaniciIslemTurleri();
        this.tanim = ""
        this.kullanici = new Kullanici();
    }
    id: number;
    islemTarih: string;
    kullaniciIslemTurleri: KullaniciIslemTurleri;
    kullanici: Kullanici;
    tanim: string;
}
