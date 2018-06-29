import { Component, OnInit, Output, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { IArea } from 'app/models/area';
import { DashboardService } from 'app/_services/dashboard.service';
import { ITaskClass } from 'app/models/taskclass';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';



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
  equipmentList;
  locationList = [];
  modeList;
  start;
  destination;
  initializeSubscription;
  filterSubscription;
  copyTaskSubscription;
  @Output() toggleSideBarEvent = new EventEmitter();



  constructor(private dashBoardService: DashboardService, private fb: FormBuilder, private ngZone: NgZone) {
   }

  ngOnInit() {
    this.dashBoardService.getModeList().subscribe(
      mode => this.modeList = mode,
      error => console.log(error)
    );
    this.dashBoardService.getEquipmentList().subscribe(
      equipment => this.equipmentList = equipment,
      error => console.log(error)
    );

    this.copyTaskSubscription = this.dashBoardService.copyTask.subscribe(
      task =>  this.copyTask(task)
    );

    this.initializeSubscription = this.dashBoardService.initializeData.subscribe(
      () => {
        this.areas = this.dashBoardService.areas;
        this.currentArea = this.dashBoardService.currentArea;
        this.getLocationList();
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
    this.start = '';
    this.destination = '';
    this.form = this.fb.group({
      name : new FormControl('', Validators.required),
      phone: '',
      email: '',
      notes: '',
      area:  '',
      taskClass: '',
      start: '',
      destination: ''
    });
  }

  changeForm() {
    const temp = {name: this.form.get('name').value, phone: this.form.get('phone').value, email: this.form.get('email').value,
                  notes: this.form.get('notes').value};
    this.createForm();
    this.form.patchValue({name: temp.name, phone: temp.phone, email: temp.email, notes: temp.notes});
  }

  setFormArray(classID: Number) {
    this.form.patchValue({area: this.currentArea, taskClass: classID});
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
    this.changeForm();
    this.setFormArray(Number(event.target.value));
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
    this.changeForm();
    this.setFormArray(this.taskClassList[0].classID);
  }

  getLocationList() {
    this.dashBoardService.getLocationList().subscribe(
      location => this.locationList = location,
      error => console.log(error),
      () => console.log(this.locationList)
    );
  }


  inputFormatter = (value: any) => value.title || '';
  resultFormatter = (value: any) => value.title || '';
  search = (text$: Observable<string>) =>
  text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term.length < 2 ? []
      : this.locationList.filter(v =>
       v['title'].toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))

      onSelectStartItem(event: NgbTypeaheadSelectItemEvent): void {
        console.log(event);
        this.form.patchValue({start: event.item.id});
      }

      onSelectDestItem(event: NgbTypeaheadSelectItemEvent): void {
        console.log(event);
        this.form.patchValue({destination: event.item.id});
      }

      copyTask(task) {
        console.log(task);
      //   Object.keys(task).map(key => {
      //   this.form.patchValue({key: task.key});
      //  });
      }


  ngOnDestroy() {
    this.initializeSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.copyTaskSubscription.unsubscribe();
  }
    onSubmit() {
      if (this.form.get('Panel2')) {
      if (this.checkValidity('Panel1') && this.checkValidity('Panel2')) {
        console.log(this.form.value);
        alert('submitted');
      }
    } else {
      if (this.checkValidity('Panel1')) {
        alert('submitted');
    }
    }
  }

    checkValidity(fieldName) {
      if (this.checkIfValid(this.form.get(fieldName).value)) {
        return true;
      } else {
        this.form.get(fieldName).setErrors({'invalidloc': true});
        return false;
      }
    }

    checkIfValid(obj: Object) {
       return obj.hasOwnProperty('title') && obj.hasOwnProperty('id');
    }

    onCancel() {
      this.toggleSideBarEvent.emit();
    }

}
