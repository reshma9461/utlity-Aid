import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  edituserform:any=FormGroup;
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

    
    this.edituserform = this.fb.group({
      // type: ['', Validators.required ],
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
      this.edituserform.patchValue({
            username: this.userlist.username,
            email: this.userlist.email,
            password:this.userlist.password,  
          });
      // console.log(this.userlist);
    })

    // let jjj;
    // this.serviceobj.notifyObservable$.subscribe((res:any)=>{
    // console.log("-------------------",res);
    // this.userdata=res;

    // jjj=JSON.parse(JSON.stringify(res));
    // alert(jjj.username)
    // this.edituserform.setValue({
    //     username: this.userdata.username,
    //     email: this.userdata.email,
    //     password:this.userdata.password,  
    //   });
      // console.log(this.userdata)
      // this.edituserform.value.username= this.userdata.username,
      // console.log(this.edituserform.value.username)
      // this.edituserform.value.username = "test";
      // console.log("this.edituserform.value", this.edituserform.value);
      // this.edituserform.patchValue({
      //   username: 'dddddd',
      //   email: '3333',
      //   password:'abc'
      // });
  // });
  }
  get f() { return this.edituserform.controls; }

  editUserDetails(){
    this.submitted = true;
    if (this.edituserform.invalid) {
     alert("invalid")
      return;
    } else {
      let obj = this.edituserform.value;
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
          this.edituserform.reset();
        }
      });
      // ,error =>console.error(error));
    }
  }
}
