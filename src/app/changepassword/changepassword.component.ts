import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  submitted = false;
  changepasswordform:any=FormGroup;
  public sessionStorage = sessionStorage;
  id:any
  constructor(private serviceobj:HttpserviceService,private router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.id=sessionStorage.getItem("id");
    // alert(this.id)
    this.changepasswordform=this.fb.group({
      userId:this.id,
      password: ['', [Validators.required,Validators.minLength(6)] ],
      confirmPassword:['', [Validators.required,this.passwordMatchValidator('password')]],            
    },
    );

    // this.changepasswordform.addValidators(
    //   this.matchValidator(this.changepasswordform.get('password'), this.changepasswordform.get('confirmPassword'))
    // );
  }
  get f() { return this.changepasswordform.controls; }

   passwordMatchValidator(password: string): ValidatorFn {
    return (control: any) => {
      console.log(control)
      if (!control || !control.parent) {
        return null;
      }
      return control.parent.get(password).value === control.value ? null : { mismatch: true };
    };
  }
  
  changepassword(){
    this.submitted = true;
    if (this.changepasswordform.invalid) 
    {
      // alert("invalid form")
      return;
    }
    else{
    let body = this.changepasswordform.value;
    this.serviceobj.changePassword(body).subscribe((result) => {
      // console.log(obj1.code)
      console.log(result);
      this.submitted=false;
      this.changepasswordform.reset(); 
      if (result.code == 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Password Change Successfully!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
  )
  }
  }
}
