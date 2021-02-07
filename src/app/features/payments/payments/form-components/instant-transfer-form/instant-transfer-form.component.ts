import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { animations } from '../shared/animations';
import { InstantTransfer } from '../../../models/instantTransfer.entity';
import { TransferService } from '../../../services/transfer.service';

@Component({
  selector: 'app-instant-transfer-form',
  templateUrl: './instant-transfer-form.component.html',
  styleUrls: ['./instant-transfer-form.component.scss'],
  animations: [animations.errorTrigger, animations.formTrigger],
})
export class InstantTransferFormComponent implements OnInit {
  title = 'Instant transfer';
  form: FormGroup;
  constructor(private transferService: TransferService) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      account: new FormControl('', Validators.required),
      transferTo: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      transferType: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transfer: InstantTransfer = {
        date: new Date(),
        paymentType: 'instant',
        fromAccount: this.account.value,
        destinationAccountNumber: this.transferTo.value,
        amount: this.amount.value,
        transferType: this.transferType.value,
      };
      this.transferService.addTransfer(transfer).subscribe((_) => {
        alert('successful payment');
      });
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
  // getters
  // @ts-ignore
  get account(): AbstractControl {
    return this.form.get('account');
  }

  // @ts-ignore
  get transferTo(): AbstractControl {
    return this.form.get('transferTo');
  }

  // @ts-ignore
  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  // @ts-ignore
  get transferType(): AbstractControl {
    return this.form.get('transferType');
  }
}
