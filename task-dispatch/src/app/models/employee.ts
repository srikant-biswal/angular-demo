export interface IEmployee {
  EmployeeId: Number;
  SteHirNodeId: Number;
  FunctionalAreaId: Number;
  EmpStatusType: Number;
  Brief: String;
  FirstName: String;
  LastName: String;
  ZoneBrief: String;
  LastStatusChangeAt: String;
  PreviousStatus: Number;
  EmployeeSupervisor: String;
  Location: String;
  IsSupervisor: boolean;
  Active: boolean;
  AssignedTasks: String;
  Badge: String;
  IsDeviceEnabled: Number;
  DiffHour: String;
  DiffMinute: String;
  AddNofHours: String;
  ErrorCode: Number;
  ErrorResponse: String;
}
