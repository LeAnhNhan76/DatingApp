import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemConstants, UrlConstants } from 'src/app/core/common';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/domain';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class AuthenService {

  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable()
  constructor(private http: HttpClient) { }

  login(model: any): any {
    return this.http.post(SystemConstants.BASE_API + UrlConstants.LOGIN, model).pipe(
      map((response: any) => {
        const user : User = response;
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
        this.setCurrentUser(user);
      })
    );
  }

  register(model: any): any {
    return this.http.post(SystemConstants.BASE_API + UrlConstants.REGISTER, model).pipe(
      map((user: any) => {
        if(user) {
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User | null) {
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.setCurrentUser(null);
  }
}
