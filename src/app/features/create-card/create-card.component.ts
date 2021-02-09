import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CardService } from '../shared/services/card.service';

@Component({
  selector: 'app-features-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
})
export class CreateCardComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private cardService: CardService) {}

  makeInputUpperCase(input: string) {
    this.form
      .get(`${input}`)
      .setValue(this.form.get(`${input}`).value.toUpperCase());
  }

  makeInputTransforms() {
    // ბარათის და მისი ფლობელის სახელების მთავრულად გარდაქმნა
    this.makeInputUpperCase('cardName');
    this.makeInputUpperCase('cardholder');

    // ბარათის ანგარიშის ნომერზე 'GE32TB'-ის მიმატება
    this.form
      .get('accountNumber')
      .setValue('GE32TB' + this.form.get('accountNumber').value);
  }

  // ბარათების დამატება სერვერზე, სერვისის დახმარებით
  onSubmit() {
    if (this.form.valid) {
      this.makeInputTransforms();

      // ბარათების დამატების სერვისი
      this.cardService
        .create(this.form.getRawValue())
        .pipe(finalize(() => this.form.reset()))
        .subscribe();
    }
  }

  // ბარათის შესავსები ფორმა და მისი ვალიდაცია
  ngOnInit(): void {
    this.form = this.fb.group({
      // უნდა შეიყვანონ: ბარათის სახელწოდება (გამოიყენება მხოლოდ ასოები და რიცხვები)
      cardName: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/),
        ],
      ],
      accountNumber: [
        // უნდა შეიყვანონ: 16 რიცხვი
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{16}$/),
          Validators.maxLength(16),
        ],
      ],
      cardNumber: [
        // უნდა შეიყვანონ: 16 რიცხვი
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{16}$/),
          Validators.maxLength(16),
        ],
      ],
      cardholder: [
        // უნდა შეიყვანონ: სახელი და გვარი (დაშვებულია მხოლოდ ასოები)
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)],
      ],
      expirationDate: [
        // უნდა შეიყვანონ: თთ.წწ შაბლონის მიხედვით (მინიმალური წელი 21)
        null,
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[012])[/](2[1-9]|[3-9][0-9]|\d{3})$/),
        ],
      ],
      availableAmount: [
        // შეუძლიათ აკრიფონ: ნებისმიერი რიცხვი (ნეგატიურის გარდა)
        null,
        [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9])?[0-9]*$/)],
      ],
      security3D: [true, [Validators.required]],
    });
  }
}
