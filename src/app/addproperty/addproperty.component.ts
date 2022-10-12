import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css']
})
export class AddpropertyComponent implements OnInit {

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
  // association:any
  isForm1Submitted: boolean = false;
  // pattern1="^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$";
  pattern1 = "^[A-Z0-9]+\\s[A-Z0-9]{3}$";

  // <f:validateRegex pattern="[a-zA-Z\\s]*"/>

  constructor(private formBuilder: FormBuilder, private serviceobj: HttpserviceService, private router: Router) { }

  ngOnInit() {
    this.PropertyForm = this.formBuilder.group({
      propertyAddress: ['', Validators.required],
      propertyPostCode: ['', [Validators.required, Validators.pattern(this.pattern1)]],
      voiddate: ['', Validators.required],
      association: ['', Validators.required],
      // checked: [false, Validators.requiredTrue],
      costCentre: ['', Validators.required],
      electricMeterType: ['', Validators.required],
      readOne: ['', Validators.required],
      electricMeterSrNo: ['', Validators.required],
      electricCard: ['', Validators.required],
      inType: ['', Validators.required],
      electricDebtOutstanding: [''],
      comments: [''],
      gasMeterType: [''],
      readOneGas: [''],
      gasMeterSrNo: [''],
      gasCard: [''],
      gasInType: [''],
      gasDebtOutstanding: [''],
      previousOwnerName: ['', Validators.required],
      forwardingAddress: [''],
      propertyImage: this.formBuilder.array([]),

    });

    // this.supplierForm = this.formBuilder.group({
    //   tenantName: ['', Validators.required],
    //   tenantDateMoveIn: ['', Validators.required],
    //   tenantMobile: ['', Validators.required],
    //   tenantLandline: ['', Validators.required],
    //   finalMeterRead: ['', Validators.required],
    // });

    this.tenantform = this.formBuilder.group({
      tenantName: ['', Validators.required],
      tenantDateMoveIn: ['', Validators.required],
      finalMeterRead: ['', Validators.required],
      tenantDetailsAdded: ['', Validators.required],

    });

    this.serviceobj.getassociation().subscribe((result: any) => {
      this.associationlist = result.results;
    })
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

  changeevent(event: any) {
    if (event.target.value == "In Debt") {
      this.PropertyForm.controls['gasDebtOutstanding'].setValidators(Validators.required);
    } else {
      this.PropertyForm.controls['gasDebtOutstanding'].setValidators(Validators.maxLength(200));
    }
    this.PropertyForm.controls['gasDebtOutstanding'].updateValueAndValidity();
  }
  // *********************************Property Details*************************************************
  savePropertyDetails() {
    alert(JSON.stringify(this.PropertyForm.value));
    
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
      this.serviceobj.addproperty(obj).subscribe(result => {
        this.id = result.id;
        console.log("id :" + this.id);
        // this.submitted = false;
        this.isForm1Submitted = true;
        console.log(result);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Void Property Details Saved Successfully!',
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigateByUrl('propertyedit?id=' + this.id);
      });
      // ,error =>console.error(error));
    }

  }
  // *******************************************************************************************  
  selectassociation(e: any) {
    // console.log(e.target.value)
    // alert(this.association=e.target.value);
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
      this.serviceobj.addSupplierDetails(obj).subscribe((result) => {
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
      this.serviceobj.addTenantDetails(obj).subscribe((result) => {
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
    this.serviceobj.fileupload(formdata).subscribe((result) => {
      // console.log(JSON.stringify(result));
      let aaa = JSON.parse(JSON.stringify(result));
      this.propertyImage = this.PropertyForm.get("propertyImage") as FormArray;
      this.propertyImage.push(new FormControl(aaa.path));
      this.propertyImagePreview.push(aaa.path);
      // alert(JSON.stringify(this.PropertyForm.value));
      var x = document.getElementById("drpzone") as HTMLInputElement | null;;
      if (x?.style.display === "none") {
        x.style.display = "block";

      } else if (x?.style.display === "block") {
        x.style.display = "none";
      }
    });
  }

  onRemove(sss: any) {
    this.propertyImage.removeAt(this.propertyImagePreview.indexOf(sss));
    this.propertyImagePreview.splice(this.propertyImagePreview.indexOf(sss), 1);
    this.files.splice(this.propertyImagePreview.indexOf(sss), 1);
  }

  // gasMeterType: [''],
  // readOneGas: [''],
  // gasMeterSrNo: [''],
  // gasCard: [''],
  // gasInType: [''],
  // gasDebtOutstanding: [''],
  // onSelectFile(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event:any) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  // }


  // addImg() {
  // var showDropZone: HTMLElement = document.getElementById("dropZoneShow");
  // var showDropZone = document.getElementById("showDropZone") as HTMLInputElement | null;;
  // var cancelDropZone = document.getElementById("cancelDropZone") as HTMLInputElement | null;;
  // showDropZone.style.display = "block";


  // const showDropZone = document.getElementsByClassName(
  //   'dropZoneShow',
  // ) as HTMLCollectionOf<HTMLElement>;
  //     showDropZone.style.display = "block";

  // $(".dropZoneShow").show();
  // $(".showDropZone").hide();
  // $(".cancelDropZone").show()

  //   var first = document.getElementById('dropZoneShow') as HTMLElement;

  //   if (first?.style.display === "none") {
  //     first.style.display = "block";

  //   } else if (first?.style.display === "block") {
  //     first.style.display = "none";
  //   }
  //   // $(".dropZoneShow").show();
  //   // $(".showDropZone").hide();
  //   // $(".cancelDropZone").show();

  // }
  //   cancelFun() {
  //     // $(".dropZoneShow").hide();
  //     // $(".showDropZone").show();
  //     // $(".cancelDropZone").hide()
  //   }
  //   selectassociation(e: any) {
  //     console.log(e.target.value)
  //     //  alert(this.createdBy=e.target.value);
  //   }
  //   getImageFromFile(i:number){

  // // alert(i);

  //     var reader = new FileReader();
  //     reader.readAsDataURL(this.files[i]); // read file as data url

  //     reader.onload = (event:any) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //     return this.url;
  // }
  //   onSelect(event: any) {
  //     console.log(event);
  //     this.files.push(...event.addedFiles);
  //   }

  //   onRemove(event: any) {
  //     console.log(event);
  //     this.files.splice(this.files.indexOf(event), 1);
  //   }

  //   myFunction() {
  //     var x = document.getElementById("myDIV") as HTMLInputElement | null;;
  //     if (x?.style.display === "none") {
  //       x.style.display = "block";

  //     } else if (x?.style.display === "block") {
  //       x.style.display = "none";
  //     }
  //   }

  //   toggleShow() {

  //     this.isShown = !this.isShown;

  //   }


  // saveSupplierDetails() {
  //   if (this.supplierForm.invalid) {
  //     alert("Please fille S the form");
  //   } else {
  //     alert("validation Comple");
  //   }
  // }

  // Tbtnsave() {
  //   // let obj = this.tenantform.value;
  //   // sessionStorage.setItem('username', obj.username);
  //   // this.serviceobj.addTenantDetails(obj).subscribe((result) => {
  //   //   console.log(result);
  //   //   let obj1 = JSON.parse(JSON.stringify(result.result));
  //   //   sessionStorage.setItem('type', obj1.type);
  //   // },
  //   // )
  // }
}
