import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editmanager',
  templateUrl: './editmanager.component.html',
  styleUrls: ['./editmanager.component.css']
})
export class EditmanagerComponent implements OnInit {
  editmanagerform:any=FormGroup;
  submitted = false;  
  userdata:any=[];
  name:any;
  username:any;
  email:any;
  id:any;
  userlist:any=[];
  constructor(private fb:FormBuilder , private serviceobj:HttpserviceService,private route: ActivatedRoute) {}

  ngOnInit(): void {  
    this.route.queryParams.subscribe((param: Params) => {
      let obj = JSON.parse(JSON.stringify(param));
      this.id = obj.id;
      // alert(this.id);
    })

    this.editmanagerform = this.fb.group({
      objectId: [this.id],
      username: ['', Validators.required ],
      email: ['', Validators.required ],
      password:['', [Validators.required ,Validators.minLength(6)]],
      Confirmpassword: ['', [Validators.required ,Validators.minLength(6)]],
    });
    
    let body={
      objectId:this.id,
    }
    this.serviceobj.getuserdetails1(body).subscribe((res:any) =>{
      this.userlist=res.results;
      console.log(this.userlist);
    })

  }
  get f() { return this.editmanagerform.controls; }

  editManagerDetails(){
    this.submitted = true;
    if (this.editmanagerform.invalid) {
     alert("invalid")
      return;
    } else {
      let obj = this.editmanagerform.value;
      // alert(obj)
      this.serviceobj.edituser(obj).subscribe((result: any) => {
       console.log(result)
        if (result.status == "success") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User Updated Successful!',
            showConfirmButton: false,
            timer: 2000
          })
          this.submitted=false;
          this.editmanagerform.reset();
        }
      });
      // ,error =>console.error(error));
    }
  }
}
