import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  _name;
  _phone;
  @Output() childEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
    onSubmit() {
    }

    onCancel() {
      this.childEvent.emit();
    }

}
