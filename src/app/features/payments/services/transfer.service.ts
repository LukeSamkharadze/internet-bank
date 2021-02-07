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
    return this.http.post(environment.URL + 'payments', transfer); // subscribe
  }
}
