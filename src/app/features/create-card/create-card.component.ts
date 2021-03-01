import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CardService } from '../shared/services/card.service';
import { AuthService } from '../shared/services/auth.service';
import { fadeInOut } from '../shared/animations';

@Component({
  selector: 'app-features-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
  animations: [fadeInOut],
})
export class CreateCardComponent implements OnInit {
  form: FormGroup;
  cardType: '' | 'Mastercard' | 'Visa card' = '';
  cardIconUrl = '';
  cardBgUrl = './assets/cards/backgrounds/light-orange.svg';
  color = '';

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private authService: AuthService
  ) {}

  // Get formControl value
  formCtrlVal(name: string) {
    return this.form.get(name).value;
  }

  // Determine 'Card Bg, Icon & Color' based on 'Card Type' on creation
  determineCard() {
    const firstNum = this.formCtrlVal('cardNumber')[0];
    switch (firstNum) {
      case '4':
        return (
          (this.cardType = 'Visa card'),
          (this.cardIconUrl = `./assets/cards/visa.svg`),
          (this.cardBgUrl = `./assets/cards/backgrounds/blue.svg`),
          (this.color = 'visa-cl')
        );
      case '5':
        return (
          (this.cardType = 'Mastercard'),
          (this.cardIconUrl = `./assets/cards/mastercard.svg`),
          (this.cardBgUrl = `./assets/cards/backgrounds/orange.svg`),
          (this.color = 'master-cl')
        );
      default:
        return (
          (this.cardIconUrl = ''),
          (this.cardType = ''),
          (this.cardBgUrl = './assets/cards/backgrounds/light-orange.svg'),
          (this.color = '')
        );
    }
  }

  makeInputUpperCase(formCtrl: string) {
    this.form.get(formCtrl).setValue(this.formCtrlVal(formCtrl).toUpperCase());
  }

  makeInputTransforms() {
    // Transform to uppercase Card's and Cardholder's names
    this.makeInputUpperCase('cardName');
    this.makeInputUpperCase('cardholder');

    // Concat 'GE32TB' to the Account Number
    this.form
      .get('accountNumber')
      .setValue('GE32TB' + this.formCtrlVal('accountNumber'));
  }

  // Adding Card on Server using Service
  onSubmit() {
    if (this.form.valid) {
      this.makeInputTransforms();

      // Adding current 'User Id' to card
      const card = {
        ...this.form.getRawValue(),
        userId: this.authService.userId,
      };

      // Card addition Service
      this.cardService
        .create(card)
        .pipe(finalize(() => this.form.reset({ security3D: true })))
        .subscribe();
    }
  }

  // Card Form and its validation
  ngOnInit(): void {
    this.form = this.fb.group({
      // Must be typed: Card Name (only letters and numbers are allowed)
      cardName: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/),
        ],
      ],
      accountNumber: [
        // Must be typed: 16 numbers
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{16}$/),
          Validators.maxLength(16),
        ],
      ],
      cardNumber: [
        // Must be typed: 16 numbers
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{16}$/),
          Validators.maxLength(16),
        ],
      ],
      cardholder: [
        // Must be typed: Name and Surname (only letters are allowed)
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)],
      ],
      expirationDate: [
        // Must be typed: according 'MM/YY' example (minimum year 21)
        null,
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[012])[/](2[1-9]|[3-9][0-9]|\d{3})$/),
        ],
      ],
      availableAmount: [
        // Must be typed: Any number (except negative one)
        null,
        [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9])?[0-9]*$/)],
      ],
      security3D: [true, [Validators.required]],
    });
  }
}
