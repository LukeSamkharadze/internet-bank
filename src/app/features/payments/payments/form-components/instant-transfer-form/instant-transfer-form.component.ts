import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-instant-transfer-form',
  templateUrl: './instant-transfer-form.component.html',
  styleUrls: ['./instant-transfer-form.component.scss'],
})
export class InstantTransferFormComponent implements OnInit {
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      account: new FormControl('', Validators.required),
      transferTo: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      transferType: new FormControl('', Validators.required),
    });
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
