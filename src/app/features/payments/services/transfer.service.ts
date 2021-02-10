import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer } from '../models/bankTransfer.entity';
import { ElectronicTransfer } from '../models/electronicTransfer.entity';
import { InstantTransfer } from '../models/instantTransfer.entity';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class TransferService {
  constructor(private http: HttpClient) {}

  addTransfer(transfer: BankTransfer | ElectronicTransfer | InstantTransfer) {
    // unda shemowmdes aqvs tu ara users imxela balance ramdensac ricxavs.
    // unda shemowmdes misi payemnts limitebi.
    // unde shemowmdes sadac ricxavs arsebobs tu ara msgavsi angarishi.
    // unda dadgindes vin aris useri visac uricxavs.
    // saidanac iricxeba unda gamoakldes mis balanss sheyvanili tanxa.
    // da visac uricxavs mis balanss miematos tanxa.
    // sheidzleba currencyebis gaadyvanac damchirdes.

    // erti transferi daiposteba im useris paymentebshi saidanac gadairicxa. (gasavali)
    // meore transferi daiposteba im useris payementebshi sadac gadairicxa. (shemosavali)

    // erroris shemtxvevashi albat http iterceptors da loaders gamoviyeneb
    // da mere  popups gamovutan sadac error ewereba da forms davareseteb.
    return this.http.post(environment.URL + 'payments', transfer); // subscribe
  }

  // getUsersPayments(userId){
  //   // returns all payments of user.
  // }
}
