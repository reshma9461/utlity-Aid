import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  form:any=FormGroup;
  loading = false;
  success=true;
  isLoggedIn=true;
  username :any;
  public sessionStorage = sessionStorage;
  error = '';
  usid:any;
  type:any
  constructor(private fb: FormBuilder, private serviceobj:HttpserviceService,private router: Router, private route: ActivatedRoute) {} 

  ngOnInit(): void {
    sessionStorage.clear();
   
    this.form = this.fb.group({
      username: ['', Validators.required ],
      password:['', [Validators.required ,Validators.minLength(6)]]
    });
  }get f() { return this.form.controls; }
  logincheck() {
  //  alert("jdjs");
    this.submitted = true;
    if (this.form.invalid) 
    {
      return;
    }
    let obj = this.form.value;
    this.serviceobj.checklogin(obj).subscribe((result) => {
      // alert(JSON.stringify(result));
      if(result.code==200){
      let obj1=JSON.parse(JSON.stringify(result.result));

      sessionStorage.setItem('isLoggedIn', "true");
      sessionStorage.setItem('username', obj1.username);
      sessionStorage.setItem('userId', obj1.tempUserId);
      sessionStorage.setItem('type', obj1.type);
      sessionStorage.setItem('id', obj1._id);
      sessionStorage.setItem('association', obj1.relatedAssociation);
      sessionStorage.setItem('createdById', obj1.associatedUser);

      // this.type=sessionStorage.getItem('type');
      // this.serviceobj.loggedInUserType.next(obj1.type);
      this.serviceobj.sendData(obj1.type);

      this.form.reset(); 
      this.router.navigate(["/home"]);
      // alert(obj1.type)
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid Credential..',
        })
      }  
    },
  )};
}
