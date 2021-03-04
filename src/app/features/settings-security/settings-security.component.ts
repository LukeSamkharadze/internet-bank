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
  userAnswer: SecretQuestion = {
    questionId: 1,
    userId: 'age',
    answer: '',
  };
  userOldAnswer: SecretQuestion = {
    questionId: 1,
    userId: 'age',
    answer: '',
  };

  userQusetions;
  user;

  questions: Array<SecretQuestion>;
  constructor(
    private userServise: UserService,
    private authservice: AuthService,
    private secretQuestionservise: SecretQuestionservise
  ) {
    // getting secret quesions form DB
    this.secretQuestionservise.getAll().subscribe((val) => {
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
      dropdown: new FormControl('', [Validators.minLength(1)]),
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
    // password check
    if (this.formChange.get('newPass').value !== '') {
      if (
        this.user.password === this.formChange.get('curentPass').value &&
        this.formChange.get('newPass').value !== ''
      ) {
        this.user.password = this.formChange.get('newPass').value;
        (async () => {
          // fetching value from form
          const qId = this.formChange.get('dropdown').value.questionId;
          const qAnswer = this.formChange.get('answer').value;

          // fetching DB answers
          this.userOldAnswer = await this.secretQuestionservise
            .getAnswerByQuestionId(this.userid, qId)
            .toPromise();

          // setting form DATA

          this.userAnswer.answer = qAnswer;
          this.userAnswer.questionId = qId;
          this.userAnswer.userId = this.user.id;

          if (this.userOldAnswer) {
            this.userAnswer.id = this.userOldAnswer.id;

            this.secretQuestionservise.update(this.userAnswer).toPromise();
          } else {
            this.userAnswer.id = null;

            this.secretQuestionservise.create(this.userAnswer).toPromise();
          }
        })();
      } else {
        alert('your current password is incorrect');
      }

      // updating user  DATA

      this.userServise.update(this.user).subscribe();
    } else {
      // secret question

      (async () => {
        // fetching value from form
        const qId = this.formChange.get('dropdown').value.questionId;
        const qAnswer = this.formChange.get('answer').value;

        // fetching DB answers
        this.userOldAnswer = await this.secretQuestionservise
          .getAnswerByQuestionId(this.userid, qId)
          .toPromise();

        // setting form DATA

        this.userAnswer.answer = qAnswer;
        this.userAnswer.questionId = qId;
        this.userAnswer.userId = this.user.id;

        if (this.userOldAnswer) {
          this.userAnswer.id = this.userOldAnswer.id;

          this.secretQuestionservise.update(this.userAnswer).toPromise();
        } else {
          this.userAnswer.id = null;

          this.secretQuestionservise.create(this.userAnswer).toPromise();
        }
      })();
    }
  }

  reset() {
    this.formChange.reset();
  }
}
