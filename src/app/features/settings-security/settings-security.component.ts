import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { SecretQuestionService } from '../shared/services/secretQuestion.service';
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

  user: IUser;

  questions: Array<SecretQuestion>;
  constructor(
    private userServise: UserService,
    private authservice: AuthService,
    private secretQuestionservice: SecretQuestionService
  ) {
    // getting secret quesions form DB
    this.secretQuestionservice.getAll().subscribe((val) => {
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
      answer: new FormControl('', [Validators.minLength(1)]),
    });
    // getting user data from DB
    this.userid = this.authservice.userId;
    this.user$ = this.userServise.getById(this.userid);
    this.user$.subscribe((value) => {
      this.user = value;
    });
  }

  private updateQuestion() {
    (async () => {
      // fetching value from form
      const qId = this.formChange.get('dropdown').value.questionId;
      const qAnswer = this.formChange.get('answer').value;

      //  checks if user chose question
      if (!qId) {
        // if user wrote answer without question "alerts"
        if (qAnswer) {
          alert('please select question');
          return;
        }
      }

      // fetching DB answers
      this.userOldAnswer = await this.secretQuestionservice
        .getAnswerByQuestionId(this.userid, qId)
        .toPromise();
      console.log(this.userOldAnswer);

      // setting form DATA
      if (this.userOldAnswer) {
        this.userOldAnswer.answer = qAnswer;
        this.secretQuestionservice.update(this.userOldAnswer).toPromise();
      } else {
        this.userAnswer.id = null;
        this.userAnswer.answer = qAnswer;
        this.userAnswer.questionId = qId;
        this.userAnswer.userId = this.user.id;
        this.secretQuestionservice.create(this.userAnswer).toPromise();
      }
    })();
  }

  onSubmit() {
    // password check
    if (this.user.password === this.formChange.get('curentPass').value) {
      if (this.formChange.get('newPass').value !== '') {
        this.user.password = this.formChange.get('newPass').value;
      }
      this.updateQuestion();

      // updating user  DATA
      this.userServise.update(this.user).subscribe();
    } else {
      // secret question
      alert('your current password is incorrect');
    }
  }

  reset() {
    this.formChange.reset();
  }
}
