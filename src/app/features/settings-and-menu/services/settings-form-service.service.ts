import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { FormFields } from '../../shared/interfaces/form.interface';
@Injectable()
export class SettingsFormServiceService {
  private URL = environment.URL;

  constructor(private http: HttpClient) {}

  getUserInfo(id): Observable<FormFields> {
    return this.http.get<FormFields>(this.URL + `forms/${id}`);
  }

  updateInfo(form: FormFields): Observable<FormFields> {
    return this.http.put<FormFields>(this.URL + `forms/${form.id}`, form);
  }
  deleteUser(id): Observable<string> {
    return this.http.delete<string>(this.URL + `forms/${id}`);
  }
}
