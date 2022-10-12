import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  registerform:any=FormGroup
  loading = false;
  success=true;
  isLoggedIn=true;
  username :any;
  error = '';
  constructor(private fb: FormBuilder, private serviceobj:HttpserviceService,private router: Router, private route: ActivatedRoute) {} 

  ngOnInit(): void {
    this.registerform = this.fb.group({
      type: ['', Validators.required ],
      username: ['', Validators.required ],
      email: ['', Validators.required],
      password:['', [Validators.required ,Validators.minLength(6)]],
      Confirmpassword: ['', Validators.required , Validators.minLength(6)],
    }
    );
  }get f() { return this.registerform.controls; }
  
  addDetails(registerform:any) {
    // alert("adddetails");
    this.submitted = true;
    if (registerform.invalid) 
    {   
        // alert("invalid form")
        return;
    }else{
      // alert("valid")
      if(this.registerform.valid){}
      let obj = this.registerform.value;
      this.serviceobj.createaccount(obj).subscribe((result:any) => {
        console.log(result.type);
        if(result.status == "success"){
          this.submitted = false;
          this.registerform.reset(); 
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User Registration successfull!',
            showConfirmButton: false,
            timer: 2000
          })
        }
        else{
          alert("Invalid Credential..");
        }     
      })
    }   
  }
}


