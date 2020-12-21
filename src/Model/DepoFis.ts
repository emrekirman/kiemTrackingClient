import { FisHareketGiris } from "./FisHareketGiris";
import { IslemCesidi } from "./IslemCesidi";
import { CariTanim } from './CariTanim';
import { Birim } from './Birim';
import { FisHareketCikis } from './FisHareketCikis';

export class DepoFis {

    constructor(giris: boolean) {
        this.girisList = [];
        this.cikisList = [];
        this.giris = giris;
        this.faturaTutar = 0;
    }

    id: number;
    fisNo: number;
    faturaTutar: number;
    fisTarih: string;
    dayanakBelge: string;
    dayanakTarih: string;
    aciklama: string;
    dayanakNo: number;
    giris: boolean;
    girisList: FisHareketGiris[];
    cikisList: FisHareketCikis[];
    islemCesidi: IslemCesidi;
    cariTanim: CariTanim;
    birim: Birim;
}
