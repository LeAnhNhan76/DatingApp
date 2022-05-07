import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenService } from '../core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelEvent = new EventEmitter<boolean>();

  model: any = {};
  
  constructor(private authenService: AuthenService) { }

  ngOnInit(): void {
  }

  register () : void {
    this.authenService.register(this.model).subscribe((response: any) =>{
      console.log('response', response);
      this.cancel();
    },(error: any) =>{
      console.log('Error of request:', error);
    })
  }

  cancel () : void {
    this.cancelEvent.emit(true);
  }
}
