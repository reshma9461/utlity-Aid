import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {
  editclientform:any=FormGroup;
  submitted = false;  
  userdata:any=[];
  name:any;
  username:any;
  email:any;
  id:any;
  clientlist:any=[];
  constructor(private fb:FormBuilder , private serviceobj:HttpserviceService,private route: ActivatedRoute) {}

  ngOnInit(): void {  
    this.route.queryParams.subscribe((param: Params) => {
      let obj = JSON.parse(JSON.stringify(param));
      this.id = obj.id;
      // alert(this.id);
    })

    this.editclientform = this.fb.group({
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
      this.clientlist=res.results;
      alert(this.clientlist)
      this.editclientform.patchValue({
        username: this.clientlist.username,
        email: this.clientlist.email,
        password:this.clientlist.password,  
      });
    })
  }
  get f() { return this.editclientform.controls; }

  editClientDetails(){
    this.submitted = true;
    if (this.editclientform.invalid) {
     alert("invalid")
      return;
    } else {
      let obj = this.editclientform.value;
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
          this.editclientform.reset();
        }
      });
      // ,error =>console.error(error));
    }
  }
}
