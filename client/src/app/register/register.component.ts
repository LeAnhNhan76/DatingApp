import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelEvent = new EventEmitter<boolean>();
  model: any = {};
  
  constructor() { }

  ngOnInit(): void {
  }

  register () : void {
    console.log('model', this.model);
  }

  cancel () : void {
    this.cancelEvent.emit(true);
  }
}
