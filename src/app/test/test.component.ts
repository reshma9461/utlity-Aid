import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  title = 'my-angular-app';
  addPropertyForm: any = FormGroup;
  contactForm:any=FormGroup;
  submitted = false;
  isShown: boolean = false; // hidden by default
  checked: any;
  isShowDivIf = false;
  selectedValue: string = '';
  selectVal: string = '';
  selectvalue: string = '';
  selectmeterTypeVal: string = '';
  selectdebtvalue: string = '';
  files: File[] = [];
  associationlist: any = [];
  url:any;
 
  countries = [
    { id: 1, name: "United States" },
    { id: 2, name: "Australia" },
    { id: 3, name: "Canada" },
    { id: 4, name: "Brazil" },
    { id: 5, name: "England" }
  ];
  // checked:any
  // theForm:FormGroup
  // selectedValue: string = '';
    constructor(private formBuilder: FormBuilder, private serviceobj:HttpserviceService) {
        // this.theForm = formBuilder.group({
        //     firstCheck: false
    //  })
    }

    ngOnInit() {
      this.addPropertyForm = this.formBuilder.group({
        propertyAddress: ['', Validators.required],
        propertyPostCode: ['', Validators.required],
        voiddate: ['', Validators.required],
        association: ['', Validators.required],
        costCentre: ['', Validators.required],
        electricMeterType: ['', Validators.required],
        electricMeterSrNo: ['', Validators.required],
        electricCard: ['', Validators.required],
        inType: ['', Validators.required],
        gasMeterType: ['', Validators.required],
        readOneGas: ['', Validators.required],
        gasMeterSrNo: ['', Validators.required],
        gasCard: ['', Validators.required],
        gasInType: ['', Validators.required],
        previousOwnerName: ['', Validators.required],
        gasDebtOutstanding: ['', Validators.required],
      });
      this.serviceobj.getassociation().subscribe((result: any) => {
        // console.log(result)
        this.associationlist = result.results;
      })

      this.contactForm = this.formBuilder.group({
        country: [null]
      });
    }
    get f()
     { return this.addPropertyForm.controls; }
    submit() {
      console.log("Form Submitted")
      console.log(this.contactForm.value)
    }
   
    selectassociation(e: any) {
      console.log(e.target.value)
      //  alert(this.createdBy=e.target.value);
    }
    // check() {
    //     console.log(this.theForm.value['firstCheck'] === true)
    //   }


      onSubmit() {
        this.submitted = true;
        if (this.addPropertyForm.invalid) {
          alert("invalid");
          return;
        } else {
          alert("valid");
    
          let obj = this.addPropertyForm.value;
          this.serviceobj.addproperty(obj).subscribe((result) => {
            console.log(result);
            // this.addPropertyForm.reset();
            alert(result.success);
    
          });
          //,error =>console.error(error));
        }
      }
      
    }
    

