import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { SecretQuestionService } from '../shared/services/secretQuestion.service';
import { IUser } from '../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { SecretQuestion } from '../shared/interfaces/secretQuestion.interface';
import { NotificationsManagerService } from 'src/app/shared/services/notifications-manager.service';
import { NotificationItem } from '../../shared/entity/notificationItem';
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
    private notificationsManagerService: NotificationsManagerService,
    private userServise: UserService,
    private authService: AuthService,
    private secretQuestionService: SecretQuestionService
  ) {
    // getting secret quesions form DB
    this.secretQuestionService.getAll().subscribe((val) => {
      this.questions = val;
    });
  }

  ngOnInit(): void {
    this.formChange = new FormGroup({
      curentPass: new FormControl('', [
        Validators.minLength(7),
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      newPass: new FormControl('', [
        Validators.minLength(7),
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),

      dropdown: new FormControl(''),
      answer: new FormControl('', [Validators.minLength(1)]),

      toggle: new FormControl(false),
    });
    // getting user data from DB
    this.userid = this.authService.userId;
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
      this.userOldAnswer = await this.secretQuestionService
        .getAnswerByQuestionId(this.userid, qId)
        .toPromise();
      console.log(this.userOldAnswer);

      // setting form DATA
      if (this.userOldAnswer) {
        this.userOldAnswer.answer = qAnswer;
        this.secretQuestionService.update(this.userOldAnswer).toPromise();
      } else {
        this.userAnswer.id = null;
        this.userAnswer.answer = qAnswer;
        this.userAnswer.questionId = qId;
        this.userAnswer.userId = this.user.id;
        this.secretQuestionService.create(this.userAnswer).toPromise();
      }
    })();
  }

  onSubmit() {
    // password check
    if (this.user.password === this.formChange.get('curentPass').value) {
      if (this.formChange.get('toggle').value === false) {
        this.user.password = this.formChange.get('newPass').value;
        this.notificationsManagerService.add(
          new NotificationItem('your password updated successfully', 'success')
        );
      } else if (
        this.formChange.get('toggle').value === true &&
        this.formChange.get('dropdown').value.questionId !== undefined &&
        this.formChange.get('answer').value !== ''
      ) {
        this.updateQuestion();
        this.notificationsManagerService.add(
          new NotificationItem(
            'your secret question updated successfully',
            'success'
          )
        );
      } else {
        this.notificationsManagerService.add(
          new NotificationItem(
            'secret question fields cannot be empty',
            'failure'
          )
        );
      }

      // updating user  DATA
      this.userServise.update(this.user).subscribe();
    } else {
      // secret question
      this.notificationsManagerService.add(
        new NotificationItem('your old password is incorrect', 'failure')
      );
    }
  }

  reset() {
    this.formChange.reset();
  }
}
