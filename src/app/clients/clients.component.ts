import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clientlist:any=[];
  constructor(private serviceobj:HttpserviceService, private router:Router) { }

  ngOnInit(): void {
    // alert("l;jlk");
    let body= {
      type: sessionStorage.getItem("type")
    }
    this.serviceobj.getclientlist(body).subscribe((res:any) =>{
      this.clientlist=res.response;
      console.log(this.clientlist);
    })
  }
  deleteClient(id:any){
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
        // objectId
        let body={
          objectId:id
        }
        this.serviceobj.deleteUser(body).subscribe((result:any) =>{
          console.log(result);      
          if (result.status=="success"){
            let body= {
              type: sessionStorage.getItem("type")
            }
            this.serviceobj.getclientlist(body).subscribe((res:any) =>{
              this.clientlist=res.response;
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

  editClient(id:any){
    // alert(id);
    this.router.navigateByUrl('editclient?id=' +id);
  }
}
