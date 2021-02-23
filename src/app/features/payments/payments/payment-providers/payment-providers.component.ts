import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../services/providers.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-payment-providers',
  templateUrl: './payment-providers.component.html',
  styleUrls: ['./payment-providers.component.scss'],
})
export class PaymentProvidersComponent implements OnInit {
  public allPaymentTypes$ = this.providerService.paymentTypes$;

  search = new FormControl('');
  constructor(private providerService: ProvidersService) {}

  shouldAddComma(provider, providersArray) {
    if (providersArray.length < 2) {
      return false;
    }
    return provider !== providersArray[providersArray.length - 1];
  }

  onSearch(userFilter: string = ''): void {
    this.providerService.onSearch(userFilter);
  }

  ngOnInit() {
    this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((value) => this.onSearch(value))
      )
      .subscribe();
  }

  paymentClicked() {
    if (this.search.value) {
      this.search.setValue('', { emitEvent: false });
      this.onSearch();
    }
  }

  trackByFn(index, item) {
    return item.id;
  }
}
