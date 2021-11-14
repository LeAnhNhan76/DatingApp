import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemConstants, UrlConstants } from 'src/app/core/common';

@Injectable()
export class AuthenService {

  constructor(private http: HttpClient) { }

  login(model: any): any {
    return this.http.post(SystemConstants.BASE_API + UrlConstants.LOGIN, model);
  }
}
