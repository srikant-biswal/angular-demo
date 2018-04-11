import { Injectable, OnInit } from '@angular/core';
import {HubConnection} from '@aspnet/signalr';

@Injectable()
export class SocketService  {

  hubConnection: HubConnection;
}
