import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserType: any;
  sss: any;
  public sessionStorage = sessionStorage;
  constructor(private serviceobj: HttpserviceService) { }

  ngOnInit(): void {
  //  this.sss = sessionStorage.getItem('type');
    //this.serviceobj.sendData(this.sss);
    this.serviceobj.loggedInUserType$.subscribe(val => {
      this.currentUserType = val;
      console.log("in subscribe: " , this.currentUserType)
    })

    
  }
}
