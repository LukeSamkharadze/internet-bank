import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { animations } from '../shared/animations';
import { InstantTransfer } from '../../../models/instantTransfer.entity';
import { TransferService } from '../../../services/transfer.service';
import { ICard } from '../../../../shared/interfaces/card.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instant-transfer-form',
  templateUrl: './instant-transfer-form.component.html',
  styleUrls: ['./instant-transfer-form.component.scss'],
  animations: [animations.errorTrigger, animations.formTrigger],
})
export class InstantTransferFormComponent implements OnInit, OnDestroy {
  title = 'Instant transfer';
  form: FormGroup;
  accountsArray: ICard[];
  private subscriptions = new Subscription();

  constructor(private transferService: TransferService) {}
  ngOnInit(): void {
    this.loadCards();
    this.form = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      destinationAccountNumber: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      transferType: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transfer: InstantTransfer = {
        date: new Date(),
        paymentType: 'instant',
        ...this.form.getRawValue(),
      };
      this.subscriptions.add(
        this.transferService
          .bankOrInstantTransfer(transfer)
          .subscribe((data: { status: string; reason?: string }) => {
            if (data.status === 'success') {
              alert('success');
              this.form.reset();
              this.subscriptions.add(
                this.transferService.postTransactionToDb(transfer).subscribe()
              );
              this.loadCards();
            } else {
              alert(data.reason);
            }
          })
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  loadCards() {
    this.subscriptions.add(
      this.transferService.currentUsersCards.subscribe(
        (cards) => (this.accountsArray = cards)
      )
    );
  }
  // getters
  // @ts-ignore
  get fromAccount(): AbstractControl {
    return this.form.get('fromAccount');
  }

  // @ts-ignore
  get destinationAccountNumber(): AbstractControl {
    return this.form.get('destinationAccountNumber');
  }

  // @ts-ignore
  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  // @ts-ignore
  get transferType(): AbstractControl {
    return this.form.get('transferType');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
