import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CardService } from '../shared/services/card.service';
import { AuthService } from '../shared/services/auth.service';
import { TypeSwitcherService } from './services/type-switcher.service';
import { fadeInOut } from '../shared/animations';
import { NotificationsManagerService } from '../../shared/services/notifications-manager.service';
import { NotificationItem } from '../../shared/entity/notificationItem';

@Component({
  selector: 'app-features-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
  animations: [fadeInOut],
})
export class CreateCardComponent implements OnInit {
  form: FormGroup;
  cardType: string;
  cardIconUrl: string;
  cardBgUrl: string;
  color: string;

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private authService: AuthService,
    private typeSwitcher: TypeSwitcherService,
    private notificationService: NotificationsManagerService
  ) {
    this.typeSwitcher.cardType$.subscribe((cardType) => {
      this.cardType = cardType;
    });
    this.typeSwitcher.cardIconUrl$.subscribe((cardIconUrl) => {
      this.cardIconUrl = cardIconUrl;
    });
    this.typeSwitcher.cardBgUrl$.subscribe((cardBgUrl) => {
      this.cardBgUrl = cardBgUrl;
    });
    this.typeSwitcher.color$.subscribe((color) => {
      this.color = color;
    });
  }

  // Get formControl value
  formCtrlVal(name: string) {
    return this.form.get(name).value;
  }

  // Determine 'Card Bg, Icon & Color' based on 'Card Type' on creation
  determineCard() {
    this.typeSwitcher.checkInput(this.form.getRawValue());
  }

  makeInputUpperCase(formCtrl: string) {
    return this.formCtrlVal(formCtrl).toUpperCase();
  }

  // Adding Card on Server using Service
  onSubmit() {
    if (this.form.valid) {
      const card = {
        ...this.form.getRawValue(),
        // Adding current 'User Id' to card
        userId: this.authService.userId,
        // Transform to uppercase Card's and Cardholder's names
        cardName: this.makeInputUpperCase('cardName'),
        cardholder: this.makeInputUpperCase('cardholder'),
        // Concat 'GE32TB' to the Account Number
        accountNumber: 'GE32TB' + this.formCtrlVal('accountNumber'),
      };

      // Card addition Service
      this.cardService
        .create(card)
        .pipe(finalize(() => this.form.reset({ security3D: true })))
        .subscribe(() => {
          this.notificationService.add(
            new NotificationItem('Success! New card has been added!', 'success')
          );
          this.typeSwitcher.assignDefault();
        });
    }
  }

  ngOnInit(): void {
    // Card Form and its validation
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
