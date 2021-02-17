import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['../authentication.component.scss', './recover.component.scss'],
})
export class RecoverComponent implements OnInit {
  // Email requirements: any valid email patern 'x@x.xx'.
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() {}

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  get emailFormControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  onSubmit() {}

  ngOnInit(): void {}
}
