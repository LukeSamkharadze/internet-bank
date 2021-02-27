import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { SecretQuestionservise } from '../shared/services/secretQuestion.service';
import { IUser } from '../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { SecretQuestion } from '../shared/interfaces/secretQuestion.interface';
@Component({
  selector: 'app-settings-security',
  templateUrl: './settings-security.component.html',
  styleUrls: ['./settings-security.component.scss'],
  providers: [UserService],
})
export class SettingsSecurityComponent implements OnInit {
  formChange: FormGroup;
  userid: string;
  user$: Observable<IUser>;
  userAnswer: SecretQuestion = { id: 1, userid: 'age', answer: '' };
  user;

  questions: Array<SecretQuestion>;
  constructor(
    private userServise: UserService,
    private authservice: AuthService,
    private SecretQuestionservise: SecretQuestionservise
  ) {
    // getting secret quesions form DB
    this.SecretQuestionservise.getAll().subscribe((val) => {
      this.questions = val;
    });
  }

  ngOnInit(): void {
    this.formChange = new FormGroup({
      curentPass: new FormControl('', [
        Validators.minLength(7),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      newPass: new FormControl('', [
        Validators.minLength(7),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      dropdown: new FormControl(''),
      answer: new FormControl(''),
    });
    // getting user data from DB
    this.userid = this.authservice.userId;
    this.user$ = this.userServise.getById(this.userid);
    this.user$.subscribe((value) => {
      this.user = value;
    });
  }

  onSubmit() {
    if (this.user.password === this.formChange.get('curentPass').value) {
      this.user.password = this.formChange.get('newPass').value;
    } else {
      alert('your current password is incorrect');
    }
    // updating user  DATA
    const qId = this.formChange.get('dropdown').value.id;
    const qAnswer = this.formChange.get('answer').value;
    this.userServise.update(this.user).subscribe();

    // creating user secretquestion
    this.userAnswer.answer = qAnswer;
    this.userAnswer.id = qId;
    this.userAnswer.userid = this.user.id;
    this.SecretQuestionservise.create(this.userAnswer).subscribe();

    console.log(this.user);
    console.log(this.userAnswer);
  }

  reset() {
    this.formChange.reset();
  }
}
