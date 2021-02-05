import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CardService } from '../shared/services/card.service';

@Component({
  selector: 'app-features-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
})
export class CreateCardComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private cardService: CardService) {}

  // ბარათების დამატება სერვერზე, სერვისის დახმარებით
  onSubmit() {
    this.cardService
      .create(this.form.getRawValue())
      .pipe(tap(() => this.form.reset()))
      .subscribe();
  }

  // ბარათის შესავსები ფორმა და მისი ვალიდაცია
  ngOnInit(): void {
    this.form = this.fb.group({
      // უნდა შეიყვანონ: ბარათის სახელწოდება (პირველი ასოები უნდა იყოს მთავრული)
      cardName: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-Z]+[a-zA-Z]+( [A-Z]+[a-zA-Z]+)*$/),
        ],
      ],
      accountNumber: [
        // უნდა შეიყვანონ: GE32TB + 16 რიცხვი
        null,
        [
          Validators.required,
          Validators.pattern(/^GE32TB[0-9]{16}$/),
          Validators.maxLength(22),
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
        // უნდა შეიყვანონ: სახელი და გვარი (პირველი ასოები უნდა იყოს მთავრული)
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-Z]+[a-zA-Z]+( [A-Z]+[a-zA-Z]+)*$/),
        ],
      ],
      expirationDate: [
        // უნდა შეიყვანონ: დდ.თთ.წწწწ შაბლონის მიხედვით
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](20)\d\d$/
          ),
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
