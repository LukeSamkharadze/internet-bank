import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../services/providers.service';

@Component({
  selector: 'app-payment-providers',
  templateUrl: './payment-providers.component.html',
  styleUrls: ['./payment-providers.component.scss'],
})
export class PaymentProvidersComponent implements OnInit {
  public allPaymentTypes = this.providerService.getAllPaymentTypes();
  public userInput: string;
  constructor(private providerService: ProvidersService) {}
  ngOnInit(): void {}

  shouldAddComma(provider, providersArray) {
    if (providersArray.length < 2) {
      return false;
    }
    return provider !== providersArray[providersArray.length - 1];
  }
}
