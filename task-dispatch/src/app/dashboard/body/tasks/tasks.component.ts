import { Component, OnInit, Input, OnChanges, NgZone, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { ITask } from 'app/models/task';
import { map } from 'rxjs/operators';
import { ITaskColumn } from 'app/models/taskcolumn';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges, OnDestroy {
  modalReference;
  uncheckSubscription;
  cancelTaskSubscription;
  activeTab = 1;
  @Input() tasks: ITask[] = [];
  @Input() columnConfig: ITaskColumn[];
  @Output() toggleSideBarEvent = new EventEmitter();
  @ViewChild('taskCancelModal') taskCancelModal;
  @Output() changeStatusEvent = new EventEmitter();
  contextMenu = false;
  contextMenuRow;
  taskCancelList = [];
  cancelReason;
  additionalReason;
  x; y;
  temp: ITask[];
  rows: ITask[];
  filter = '';
  showEdit = false;
  showSelectAll;
  columns = [];
  tempColumns = [];
  selected = [];

  constructor(private dashboardService: DashboardService, private ngZone: NgZone, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.dashboardService.getTaskCancelList().subscribe (
      list => this.taskCancelList = list,
      error => console.log(error),
      () => this.cancelReason = this.taskCancelList[0].taskCancelTypeId
    );
    this.cancelTaskSubscription = this.dashboardService.cancelTask.subscribe(
      task => {this.contextMenuRow = task; this.openCancelTaskModal(); }
    );
    this.uncheckSubscription = this.dashboardService.uncheckTasks.subscribe(
      () => this.remove()
    );
  }

  ngOnChanges() {
     if (this.tasks && this.columnConfig) {
      this.filterTasks();
      this.filterColumns();
      this.sortColumns();
      this.checkSelectAll();
     }
  }

  ngOnDestroy() {
    this.uncheckSubscription.unsubscribe();
    this.cancelTaskSubscription.unsubscribe();
  }


  changeTab(tab): void {
     if (this.activeTab !== tab) {
      this.columns = [];
      this.activeTab = tab;
      this.filterTasks();
      this.filterColumns();
     }
  }

  sortColumns() {
    this.columnConfig.sort(function(a, b) {
      return (a['displayOrder'] > b['displayOrder'] ? 1 : -1);
    });
  }

  filterTasks() {
    this.temp = this.tasks.filter( task => task.tskStatusType === this.activeTab);
    this.rows = this.temp;
  }

  filterColumns() {
    this.columns = this.columnConfig.filter(column => column.statusType === this.activeTab);
  }


  getRowClass(row: ITask) {
    const date = new Date();
    const taskDate = new Date(row.completeNeededUTC);
    const timeDiff = Math.ceil((taskDate.getTime() - date.getTime()) / (1000 * 60) );
     return {
       'exceeded': (timeDiff < 0),
       'approaching': (timeDiff > 0 && timeDiff < 10)
     };
  }



  getCellClass({ row, column, value }): any {
    return {
      'st': value === 'ST',
      'sc': value === 'SC'
    };
  }

  updateFilter() {
     const val = this.filter.toLowerCase();
     if (val !== '') {
    const colsAmt = this.columns.length;
    const keys = this.columns.map(function(col) {
        if (col.show) {
          return col.prop;
        }
    });
    this.rows = this.temp.filter(function(item) {
      let searchStr = '';
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]]) {
        searchStr += (item[keys[i]]).toString().toLowerCase();
        }
      }
      return searchStr.indexOf(val) !== -1 || !val;
    });
  } else {
      this.rows = this.temp;
  }
  }

  clearFilter() {
    this.filter = '';
    this.rows = this.temp;
  }

  showEditOptions() {
    this.showEdit = true;
    this.tempColumns = JSON.parse(JSON.stringify(this.columnConfig));
  }

  saveEdit() {
      this.showEdit = false;
      this.tempColumns = [];
  }

  cancelEdit() {
    this.columnConfig = this.tempColumns;
    this.filterColumns();
    this.showEdit = false;
    this.tempColumns = [];
  }

  toggleSelectAll() {
    this.columns.map(col => col.show = this.showSelectAll);
    this.showSelectAll = ! this.showSelectAll;
  }

  checkSelectAll() {
      if (this.columns.every(col => col.show === true)) {
        this.showSelectAll = false;
    } else {
      this.showSelectAll = true;
    }
    }

    onTableContextMenu(context) {
      if (context.type === 'body') {
      this.x = context.event.x - 5 ;
      this.y = context.event.y - 5;
      this.contextMenuRow = context.content;
      this.ngZone.run(() => {
        this.contextMenu = true;
      });
      context.event.preventDefault();
      context.event.stopPropagation();
    }
    }

    copyTask() {
      this.dashboardService.copyTask.next(this.contextMenuRow);
      this.contextMenu = false;
    }

    openCancelTaskModal() {
      this.modalReference = this.modalService.open(this.taskCancelModal);
    }

    cancelTask() {
      // send cancel and additional reason
      this.contextMenuRow.tskStatusType = 6;
      this.changeStatusEvent.emit(this.contextMenuRow);
      this.resetSelections();
      this.modalReference.close();
    }

    closeModal() {
      this.cancelReason = this.taskCancelList[0].taskCancelTypeId;
      this.additionalReason = '';
      this.modalReference.close();
    }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.dashboardService.selected[1] = selected;
    this.dashboardService.actionBar.next();
  }

  resetSelections() {
    this.dashboardService.selected = [];
    this.dashboardService.actionBar.next();
    this.remove();
  }


  remove() {
    this.selected = [];
  }

}
