import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode: boolean = false;
  urlGetUsers: string = 'https://localhost:5001/api/users';
  users: any[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegister(event: any) {
    if(event) {
      this.registerMode = false;
    }
  }

  getUsers() : void {
    this.httpClient.get(this.urlGetUsers).subscribe((users: any) => {
      this.users = users;
    });
  }

}
