import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { param } from 'jquery';
import Swal from 'sweetalert2';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-propertyedit',
  templateUrl: './propertyedit.component.html',
  styleUrls: ['./propertyedit.component.css']
})
export class PropertyeditComponent implements OnInit {

  PropertyForm: any = FormGroup;
  supplierForm: any = FormGroup;
  tenantform: any = FormGroup;
  submitted = false;
  submitted3 = false;
  isShown: boolean = false; // hidden by default
  checked: any;
  isShowDivIf = false;
  selectedValue: string = '';
  selectVal: string = '';
  selectvalue: string = '';
  selectmeterTypeVal: string = '';
  selectdebtvalue: string = '';
  files: File[] = [];
  propertyImage: any = FormArray;
  propertyImagePreview: any = [];
  associationlist: any = [];
  id: any;
  url: any;
  association: any
  isForm1Submitted: boolean = false;
  getuserproperty: any = [];
  isChecked: boolean = false;
  propertyAddress: any;
  currentUserType:any;
  constructor(private formBuilder: FormBuilder, private serviceobj: HttpserviceService, private router: Router,
    private route: ActivatedRoute) { 
      this.serviceobj.loggedInUserType$.subscribe(val => {
        this.currentUserType = val;
        // alert("in pro: " +this.currentUserType)
      })
    }

  ngOnInit() {
    this.route.queryParams.subscribe((param: Params) => {
      let obj = JSON.parse(JSON.stringify(param));
      this.id = obj.id
      // alert(this.id)
    })

    this.PropertyForm = this.formBuilder.group({
      objectId: [this.id],
      propertyAddress: ['', Validators.required],
      propertyPostCode: ['', Validators.required],
      voiddate: ['', Validators.required],
      association: ['', Validators.required],
      // checked: [false, Validators.requiredTrue],
      costCentre: ['', Validators.required],
      electricMeterType: ['', Validators.required],
      electricMeterSrNo: ['', Validators.required],
      electricCard: ['', Validators.required],
      readOne: ['', Validators.required],
      inType: ['', Validators.required],
      electricDebtOutstanding: [''],
      // img:[''],
      comments: [''],
      gasMeterType: [''],
      readOneGas: [''],
      gasMeterSrNo: [''],
      gasCard: [''],
      gasInType: [''],
      gasDebtOutstanding: [''],
      previousOwnerName: ['', Validators.required],
      forwardingAddress: [''],
      propertyImage: this.formBuilder.array(['', Validators.required]),
      sectionFinished:['']

    });

    // this.PropertyForm.controls['propertyAddress'].disable();
    // this.PropertyForm.controls['association'].disable();
    // this.PropertyForm.controls['propertyAddress'].disable();
       
    this.supplierForm = this.formBuilder.group({
      MPAN: [''],
      MPANSupplier: [''],
      MPRN: [''],
      MPRNSupplier: [''],
      keySentTo: [''],
      prepayElectric:[''],
      prepayGas:[''],
      visitDate:[''],
      comments:[''],
      supplierInfoSectionFinished:['']
    

    });

    this.tenantform = this.formBuilder.group({
      tenantName: ['', Validators.required],
      tenantDateMoveIn: ['', Validators.required],
      finalMeterRead: ['', Validators.required],
      tenantDetailsAdded: ['', Validators.required],
    });

    this.serviceobj.getassociation().subscribe((result: any) => {
      this.associationlist = result.results;
    })


    let body = {
      objectId: this.id
    }
    this.serviceobj.getuserproperty(body).subscribe((result: any) => {
      console.log(result);
      this.getuserproperty = result.results
      // let obj1=(JSON.stringify(result));
      // this.propertyAddress="hgh"
      // alert(JSON.stringify(this.getuserproperty))
      let reshma = JSON.parse(JSON.stringify(this.getuserproperty));
      this.propertyImagePreview=reshma.propertyImage;
      if (reshma.gasMeterType != "") {
        this.isChecked = true;
        this.checkboxEvent();
      }
      //  alert(JSON.parse(JSON.stringify(result)));
      //  alert(obj1.propertyAddress)
      //  console.log(result);
      //  this.getuserproperty=result.result;

      //  if (result.status=="success") {
      //  this.getuserproperty=result.re
      // }
    })
    if(this.currentUserType==1){
      this.PropertyForm.disable();
      this.supplierForm.disable();
    }
  }
  get f() { return this.PropertyForm.controls; }
  get f1() { return this.tenantform.controls; }
  asdf(event: any) {
    if (event.target.value == "In Debt") {
      this.PropertyForm.controls['electricDebtOutstanding'].setValidators(Validators.required);
    } else {
      this.PropertyForm.controls['electricDebtOutstanding'].setValidators(Validators.maxLength(200));

    }
    this.PropertyForm.controls['electricDebtOutstanding'].updateValueAndValidity();

  }
  // *********************************Property Details*************************************************
  updatePropertyDetails() {
    this.submitted = true;
    if (this.PropertyForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please fill the Mandatory fields!!',
      })
      return;
    } else {

      let obj = this.PropertyForm.value;
      this.serviceobj.editproperty(obj).subscribe((result: any) => {
        // alert(result)      
        // alert(result.id)
        this.submitted = false;
        this.isForm1Submitted = true;
        if (result.status == "success") {
          // Swal.fire({
          //   position: 'center',
          //   icon: 'success',
          //   title: 'Void Property Details Save Successfully!',
          //   showConfirmButton: false,
          //   timer: 2000
          // })
        }
      });
      // ,error =>console.error(error));
    }
  }
  // *******************************************************************************************  
  selectassociation(e: any) {
    // console.log(e.target.value)
    // alert(this.association = e.target.value);
  }

  checkboxEvent() {
    var x = document.getElementById("myDIV") as HTMLInputElement | null;;
    if (x?.style.display === "none") {
      x.style.display = "block";
      this.PropertyForm.controls['gasMeterType'].setValidators(Validators.required);
      this.PropertyForm.controls['readOneGas'].setValidators(Validators.required);
      this.PropertyForm.controls['gasMeterSrNo'].setValidators(Validators.required);
      this.PropertyForm.controls['gasCard'].setValidators(Validators.required);
      this.PropertyForm.controls['gasInType'].setValidators(Validators.required);
      this.PropertyForm.controls['gasDebtOutstanding'].setValidators(Validators.required);

    } else if (x?.style.display === "block") {
      x.style.display = "none";
      this.PropertyForm.controls['gasMeterType'].setValidators(Validators.maxLength(200));
      this.PropertyForm.controls['readOneGas'].setValidators(Validators.maxLength(200));
      this.PropertyForm.controls['gasMeterSrNo'].setValidators(Validators.maxLength(200));
      this.PropertyForm.controls['gasCard'].setValidators(Validators.maxLength(200));
      this.PropertyForm.controls['gasInType'].setValidators(Validators.maxLength(200));
      this.PropertyForm.controls['gasDebtOutstanding'].setValidators(Validators.maxLength(200));

    }
    this.PropertyForm.controls['gasMeterType'].updateValueAndValidity();
    this.PropertyForm.controls['readOneGas'].updateValueAndValidity();
    this.PropertyForm.controls['gasMeterSrNo'].updateValueAndValidity();
    this.PropertyForm.controls['gasCard'].updateValueAndValidity();
    this.PropertyForm.controls['gasInType'].updateValueAndValidity();
    this.PropertyForm.controls['gasDebtOutstanding'].updateValueAndValidity();

  }

  // ************************SupplierDetails*******************************************************
  saveSupplierDetails() {
    this.submitted = true;
    if (!this.isForm1Submitted) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        // title: 'Oops...',
        title: 'Please save Void property form!',
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return;
    }
    if (this.PropertyForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        // title: 'Oops...',
        title: 'Please fill the Mandatory fields in Void Property Details!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      return;
    }
    else {
      let obj = this.supplierForm.value;
      // alert(JSON.stringify(obj));
      this.serviceobj.addSupplierDetails(obj).subscribe((result: any) => {
        console.log(result);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Supplier Info/Card Info Saved Successfully!',
          showConfirmButton: false,
          timer: 2000
        })
      });
    }
  }
  // ************************Tenant Details***********************************************************
  saveTenantDetails() {
    this.submitted = true;
    if (this.PropertyForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        // title: 'Oops...',
        title: 'Please fill the Mandatory fields in Void Property Details!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      return;
    }
    else {
      this.submitted3 = true;
      if (this.tenantform.invalid) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Please fill the Mandatory fields!',
        })
        return;
      }
      // let body= {
      //   username: sessionStorage.getItem("type"),
      //   obj : this.tenantform.value
      //   // alert(JSON.stringify(obj));
      // } 
      let obj = this.tenantform.value
      // alert(JSON.stringify(obj)); 
      this.serviceobj.addTenantDetails(obj).subscribe((result: any) => {
        console.log(result);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'New Tenant Details Saved Successfully!',
          showConfirmButton: false,
          timer: 2000
        })
      });
    }
  }
  addimg() {
    var x = document.getElementById("drpzone") as HTMLInputElement | null;;
    if (x?.style.display === "none") {
      x.style.display = "block";

    } else if (x?.style.display === "block") {
      x.style.display = "none";

    }
  }
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    // this.PropertyForm.get('img').setValue(this.files);       
    let formdata: FormData = new FormData();
    formdata.append('file', this.files[this.files.length - 1], this.files[this.files.length - 1].name)
    this.serviceobj.fileupload(formdata).subscribe((result: any) => {
      // console.log(JSON.stringify(result));
      let sss = JSON.parse(JSON.stringify(result));

      this.propertyImage = this.PropertyForm.get("propertyImage") as FormArray;
      this.propertyImage.push(new FormControl(sss.path));
      this.propertyImagePreview.push(sss.path);
      // alert(sss.path)
      var x = document.getElementById("drpzone") as HTMLInputElement | null;;
      if (x?.style.display === "none") {
        x.style.display = "block";

      } else if (x?.style.display === "block") {
        x.style.display = "none";
      }
    });
  }

  onRemove(sss: any) {
    // console.log(event);
    this.propertyImagePreview.splice(this.propertyImagePreview.indexOf(sss), 1);
    this.files.splice(this.propertyImagePreview.indexOf(sss), 1);
  }
}
