import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedLink = -1;
  hospitals: string[] = ['Hospital 1', 'Hospital 1', 'Hospital 1'];

  setLink(linkNumber: number): void {
    this.selectedLink = linkNumber;
  }
  constructor() { }

  ngOnInit() {
  }

}
