import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CardService } from '../shared/services/card.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-features-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
})
export class CreateCardComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private authService: AuthService
  ) {}

  makeInputUpperCase(input: string) {
    this.form
      .get(`${input}`)
      .setValue(this.form.get(`${input}`).value.toUpperCase());
  }

  makeInputTransforms() {
    // Transform to uppercase Card's and Cardholder's names
    this.makeInputUpperCase('cardName');
    this.makeInputUpperCase('cardholder');

    // Concat 'GE32TB' to the Account Number
    this.form
      .get('accountNumber')
      .setValue('GE32TB' + this.form.get('accountNumber').value);
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
        .pipe(finalize(() => this.form.reset()))
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
