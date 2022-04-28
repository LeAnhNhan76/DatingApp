import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SystemConstants } from './core/common';
import { User } from './core/domain';
import { AuthenService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'The Dating App'; 

  constructor(private http: HttpClient, private authenService: AuthenService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }
  
  setCurrentUser() : void {
    const userLocalStorage = localStorage.getItem(SystemConstants.CURRENT_USER);
    if(userLocalStorage) {
      const currentUser: User = JSON.parse(userLocalStorage);
      this.authenService.setCurrentUser(currentUser);
    }
  }

}
