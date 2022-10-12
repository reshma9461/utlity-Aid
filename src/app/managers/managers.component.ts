import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  managerlist:any=[];
  constructor(private serviceobj:HttpserviceService, private router:Router ) { }

  ngOnInit(): void {
    let body= {
      type: sessionStorage.getItem("type")
    }
    this.serviceobj.getmanagerlist(body).subscribe((res:any) =>{
      this.managerlist=res.response;
      console.log(this.managerlist);
    })
  }

  deleteManager(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let body={
          objectId:id
        }
        this.serviceobj.deleteUser(body).subscribe((result:any) =>{
          console.log(result);      
          if (result.status=="success") {
            let body={
              type: sessionStorage.getItem("type")
            }
            this.serviceobj.getmanagerlist(body).subscribe((res:any) =>{
              this.managerlist=res.response;
              console.log(this.managerlist);
            })
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Record Has Been Deleted',
              showConfirmButton: false,
              timer: 2000
            })
          }
        })
      }
    })
  }
  editManager(id:any){
    // alert(id)
    this.router.navigateByUrl('editmanager?id=' +id);
  }
}
