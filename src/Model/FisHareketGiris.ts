import { CariTanim } from './CariTanim';
import { DepoFis } from './DepoFis';
import { DepoOlcuBirim } from './DepoOlcuBirim';
import { StokTanim } from './StokTanim';

export class FisHareketGiris {
    constructor() {
        this.birimFiyat = 0;
        this.miktar = 0;
        this.tutar = 0;
    }

    id: number;
    olcuBirim: DepoOlcuBirim;
    miktar: number;
    birimFiyat: number;
    tutar: number;
    depoFis: DepoFis;
    yil: number;
    stokTanim: StokTanim;
    cariTanim: CariTanim;
}
