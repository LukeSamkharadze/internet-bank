import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { animations } from '../shared/animations';
import { InstantTransfer } from '../../../../shared/interfaces/instantTransfer.entity';
import { TransferService } from '../../../services/transfer.service';
import { Subscription } from 'rxjs';
import IParent from '../../../../shared/interfaces/parent.interface';
import { CardType } from '../../../../shared/interfaces/card.interface';
import { CardService } from '../../../../shared/services/card.service';

@Component({
  selector: 'app-instant-transfer-form',
  templateUrl: './instant-transfer-form.component.html',
  styleUrls: ['./instant-transfer-form.component.scss'],
  animations: [animations.errorTrigger, animations.formTrigger],
})
export class InstantTransferFormComponent implements OnInit, OnDestroy {
  title = 'Instant transfer';
  form: FormGroup;
  currentUsersCards = this.transferService.currentUsersCards$;
  private subscriptions = new Subscription();

  constructor(
    private transferService: TransferService,
    private cardService: CardService
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.cardService
        .create({
          cardName: 'VISA CARD',
          cardType: 'VISA',
          accountNumber: '1231',
          cardNumber: '5111222233331234',
          cardholder: 'BARRY ARMSTRONG',
          expirationDate: '10/24',
          availableAmount: 269,
          security3D: false,
          userId: '2',
          id: 4,
          iconPath: './assets/create-card/create-card-visa-icon.svg',
        })
        .subscribe();
    }, 4000);

    this.form = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      destinationAccountNumber: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(0.1)]),
      transferType: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let transfer: InstantTransfer = {
        date: new Date(),
        paymentType: 'instant',
        fromUserId: this.fromAccount.value.userId,
        ...this.form.getRawValue(),
        amount: Number(this.amount.value),
      };
      this.subscriptions.add(
        this.transferService
          .bankOrInstantTransfer(transfer)
          .subscribe(
            (data: {
              status: string;
              destinationAccountUserId?: string;
              reason?: string;
            }) => {
              if (data.status === 'success') {
                alert('success');
                this.form.reset();
                transfer = {
                  ...transfer,
                  destinationAccountUserId: data.destinationAccountUserId,
                };
                this.subscriptions.add(
                  this.transferService.postTransactionToDb(transfer).subscribe()
                );
              } else {
                alert(data.reason);
              }
            }
          )
      );
    } else {
      this.form.markAllAsTouched();
    }
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
