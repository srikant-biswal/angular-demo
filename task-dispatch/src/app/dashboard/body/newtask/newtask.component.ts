import { Component, OnInit, Output, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { IArea } from 'app/models/area';
import { DashboardService } from 'app/_services/dashboard.service';
import { ITaskClass } from 'app/models/taskclass';
import { FormGroup, FormBuilder } from '@angular/forms';

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
      name : '',
      phone: '',
      email: '',
      notes: '',
      area:  '',
      taskClass: '',
      taskClassOptions: this.fb.array([])
    });
  }

  initializeForm() {
    this.form.patchValue({area: this.currentArea, taskClass: this.taskClassList[0].classID});
    this.setFormArray(this.taskClassList[0].classID);
  }

  setFormArray(classID: Number) {
    this.temp = [];
    const taskClassList: ITaskClass[] = [];
    this.filteredTaskClass.map(taskClass => {
      if (classID === taskClass.classID) {
        this.temp.push(this.fb.control({name : taskClass.controlName}));
        taskClassList.push(taskClass);
      }
    });
    this.form.setControl('taskClassOptions', this.fb.array(this.temp));
    console.log(this.form.controls.taskClassOptions);
    this.taskClassOptionsList = taskClassList;
    console.log(this.taskClassOptionsList);
  }

  changeTaskClass(event) {
    this.setFormArray(Number(event.target.value));
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
    this.initializeForm();
  }


  ngOnDestroy() {
    this.initializeSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }
    onSubmit() {
    }

    onCancel() {
      this.toggleSideBarEvent.emit();
    }

}
