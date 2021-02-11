import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankTransfer } from '../models/bankTransfer.entity';
import { ElectronicTransfer } from '../models/electronicTransfer.entity';
import { InstantTransfer } from '../models/instantTransfer.entity';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class TransferService {
  constructor(private http: HttpClient) {}

  // droebit statikuri arraya. db.json ro mowesrigdeba mere shevcvli
  // iqneba array of Cards (blaxadis inerface[])
  private currentUsersCards = [
    {
      userId: 20,
      cardName: 'Visa',
      id: 1,
      accountNumber: '123456789',
      cardNumber: '390081542451',
      cardholder: 'vigaca vigacadze',
      expirationDate: 'xval',
      availableAmount: 1500,
      security3D: false,
      iconPath: './assets/create-card/create-card-visa-icon.svg',
    },
    {
      userId: 33,
      cardName: 'Mastercard',
      id: 2,
      accountNumber: '98765431',
      cardNumber: '25660191283471',
      cardholder: 'vigaca vigacadze',
      expirationDate: 'xval',
      availableAmount: 400,
      security3D: false,
      iconPath: './assets/create-card/mastercard.svg',
    },
  ];

  getAllCards() {
    return this.currentUsersCards;
  }

  addTransfer(transfer: BankTransfer | ElectronicTransfer | InstantTransfer) {
    // unda shemowmdes aqvs tu ara users imxela balance ramdensac ricxavs.
    // unda shemowmdes misi payemnts limitebi.
    // unde shemowmdes sadac ricxavs arsebobs tu ara msgavsi angarishi.
    // saidanac iricxeba unda gamoakldes mis balanss sheyvanili tanxa.
    // da visac uricxavs mis balanss miematos tanxa.

    // erroris shemtxvevashi albat http iterceptors da loaders gamoviyeneb
    // da mere  popups gamovutan sadac error ewereba da forms davareseteb.
    return this.http.post(environment.URL + 'payments', transfer); // subscribe
  }

  validateTransfer() {} // daabrunebs an trues an tu dafailda rame mizezis gamo mag mizezs
  getUserByCardNumber() {}
  getUserByAccountNumber() {}
  removeBalance(user) {}
  addBalance(user) {}
}
