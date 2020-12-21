import { DepoOlcuBirim } from '../Model/DepoOlcuBirim';
import { DepoFis } from '../Model/DepoFis';
import { StokTanim } from './StokTanim';
import { FisHareketGiris } from './FisHareketGiris';
import { Birim } from './Birim';

export class FisHareketCikis {
    id: number;
    olcuBirim: DepoOlcuBirim;
    miktar: number;
    birimFiyat: number;
    tutar: number;
    depoFis: DepoFis;
    yil: number;
    stokTanim: StokTanim;
    fisHareketGiris: FisHareketGiris;
    birim: Birim;
}
