import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() inputUsers: any[] = [];
  @Output() cancelEvent = new EventEmitter<boolean>();

  model: any = {};
  
  constructor() { }

  ngOnInit(): void {
    console.log('users', this.inputUsers);
  }

  register () : void {
    console.log('model', this.model);
  }

  cancel () : void {
    this.cancelEvent.emit(true);
  }
}
