import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/core/services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public loggedIn: boolean = false;
  public model: any = {};

  constructor(private _authenService: AuthenService) { }

  ngOnInit(): void {
  }

  login(): void {
    if(this.model && this.model.username && this.model.password) {
      this._authenService.login(this.model).subscribe((response : any) => {
        if(response) {
          this.loggedIn = true;
        }
      }, (error: any) => {
        console.log(error);
      });
    }
  }
  
  logout(): void {
    this.loggedIn = false;
  }
}
