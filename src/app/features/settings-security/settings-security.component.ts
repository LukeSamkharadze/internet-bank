import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-settings-security',
  templateUrl: './settings-security.component.html',
  styleUrls: ['./settings-security.component.scss']
})
export class SettingsSecurityComponent implements OnInit {

formChange: FormGroup;
  constructor() { }
  ngOnInit(): void {
    this.formChange = new FormGroup({
      curentPass : new FormControl ('', [Validators.minLength(7), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      newPass : new FormControl ('', [Validators.minLength(7), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    });
  }
  onSubmit(){
console.log(this.formChange);
  }

  reset(){
    this.formChange.reset();
  }
}
