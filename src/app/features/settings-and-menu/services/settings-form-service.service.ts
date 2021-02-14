import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { FormFields } from '../../shared/interfaces/form.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsFormServiceService {
  private URL = environment.URL;

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<FormFields[]> {
    return this.http.get<FormFields[]>(this.URL + 'forms').pipe(
      map((val) => {
        return val;
      })
    );
  }

  updateInfo(id) {
    return this.http.post(this.URL + 'forms', id).pipe();
  }
}
