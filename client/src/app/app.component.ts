import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'The Dating App';
  public users: any;  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers(): void {
    this.http.get('https://localhost:5001/api/users').subscribe((response: any) => {
      this.users = response;
      console.log('users', this.users);
    }, (errors: any) => {
      console.log(errors);
    })
  }

}
