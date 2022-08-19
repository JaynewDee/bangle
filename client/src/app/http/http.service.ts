import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { server } from 'src/utils/urls';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface User {
  firstName: string;
  lastName: string;
  age: number;
  chosenName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  baseURL: string = server.baseURL;
  @Input()
  users: User[] | undefined;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  async getAllUsers() {
    const req = this.http
      .get<User[]>(this.baseURL + 'user/all', {
        observe: 'body',
      })
      .pipe(retry(3), catchError(this.handleError));
    req.subscribe((res) => (this.users = [...res!]));
  }

  async getUserStore() {
    let users = localStorage.getItem('users');
    if (users) {
      let parsed = JSON.parse(users!);
      return parsed;
    } else {
      return false;
    }
  }

  async setUserStore() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
