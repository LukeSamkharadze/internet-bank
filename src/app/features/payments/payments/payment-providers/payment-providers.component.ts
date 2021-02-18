import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../services/providers.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-payment-providers',
  templateUrl: './payment-providers.component.html',
  styleUrls: ['./payment-providers.component.scss'],
})
export class PaymentProvidersComponent implements OnInit {
  public allPaymentTypes$ = this.providerService.getPaymentTypes();
  constructor(private providerService: ProvidersService) {}
  form: FormGroup;

  shouldAddComma(provider, providersArray) {
    if (providersArray.length < 2) {
      return false;
    }
    return provider !== providersArray[providersArray.length - 1];
  }

  onSearch(userFilter: string = ''): void {
    this.allPaymentTypes$ = this.providerService.getPaymentTypes(userFilter);
  }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl(''),
    });

    this.search.valueChanges
      .pipe(
        debounceTime(500),
        tap((value) => this.onSearch(value))
      )
      .subscribe();
  }

  get search(): AbstractControl {
    return this.form.get('search');
  }

  paymentClicked() {
    if (this.search.value) {
      this.search.setValue('', { emitEvent: false });
      this.onSearch();
    }
  }
}
