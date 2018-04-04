export interface IEmployee {
  employeeId: Number;
  steHirNodeId: Number;
  functionalAreaId: Number;
  empStatusType: Number;
  brief: String;
  firstName: String;
  lastName: String;
  zoneBrief: String;
  lastStatusChangeAt: String;
  previousStatus: Number;
  employeeSupervisor: String;
  location: String;
  isSupervisor: boolean;
  active: boolean;
  assignedTasks: String;
  badge: String;
  isDeviceEnabled: Number;
  diffHour: String;
  diffMinute: String;
  addNofHours: String;
  errorCode: Number;
  errorResponse: String;
}
