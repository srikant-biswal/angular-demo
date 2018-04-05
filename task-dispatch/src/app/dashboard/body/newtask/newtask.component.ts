import { Component, OnInit, Output, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { IArea } from 'app/models/area';
import { DashboardService } from 'app/_services/dashboard.service';
import { ITaskClass } from 'app/models/taskclass';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit, OnDestroy {
  temp: any[];
  form: FormGroup;
  areas: IArea[];
  currentArea;
  taskClass: ITaskClass[];
  filteredTaskClass: ITaskClass[];
  taskClassList: ITaskClass[];
  taskClassOptionsList: ITaskClass[];
  initializeSubscription;
  filterSubscription;
  @Output() toggleSideBarEvent = new EventEmitter();

  constructor(private dashBoardService: DashboardService, private fb: FormBuilder, private ngZone: NgZone) {
   }

  ngOnInit() {
    this.initializeSubscription = this.dashBoardService.initializeData.subscribe(
      () => {
        this.areas = this.dashBoardService.areas;
        this.currentArea = this.dashBoardService.currentArea;
        this.getTaskClass();
      }
    );
    this.filterSubscription = this.dashBoardService.filterData.subscribe(
      () => {
        this.currentArea = this.dashBoardService.currentArea;
        this.filterTaskClass();
      }
    );
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name : new FormControl('', Validators.required),
      phone: '',
      email: '',
      notes: '',
      area:  '',
      taskClass: '',
    });
  }

  initializeForm(classID) {
    this.form.patchValue({area: this.currentArea, taskClass: classID});
    this.setFormArray(classID);
  }

  setFormArray(classID: Number) {
    this.taskClassOptionsList = [];
    this.filteredTaskClass.map(taskClass => {
      if (classID === taskClass.classID) {
         if (taskClass.required) {
          this.form.addControl(taskClass.controlName, new FormControl('', Validators.required));
         } else {
          this.form.addControl(taskClass.controlName, new FormControl(''));
         }
        this.taskClassOptionsList.push(taskClass);
      }
    });
    console.log(this.form.controls);
    console.log(this.taskClassOptionsList);
  }

  changeTaskClass(event) {
    this.createForm();
    this.initializeForm(Number(event.target.value));
  }

  changeFunctionalArea(event) {
    this.currentArea = Number(event.target.value);
    this.filterTaskClass();
  }

  getTaskClass() {
    this.taskClass = [];
    this.dashBoardService.getTaskClass().subscribe(
      task => task.map(value => this.taskClass.push(value)),
      error => console.log(error),
      () => this.filterTaskClass()
    );
  }

  filterTaskClass() {
  this.createForm();
  this.filteredTaskClass = this.taskClass.filter(taskClass => taskClass.functionalAreaId === this.currentArea);
  this.getTaskClassList();
  }

  getTaskClassList() {
    this.taskClassList = [];
    const flags: any[] = [];
   this.filteredTaskClass.map(taskClass => {
      if (flags[taskClass.classID]) {
        return false;
      } else {
        this.taskClassList.push(taskClass);
        flags[taskClass.classID] = true;
      }
    });
    this.initializeForm(this.taskClassList[0].classID);
  }


  ngOnDestroy() {
    this.initializeSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }
    onSubmit() {
      alert('submitted');
      console.log(this.form.status);
    }

    onCancel() {
      this.toggleSideBarEvent.emit();
    }

}
