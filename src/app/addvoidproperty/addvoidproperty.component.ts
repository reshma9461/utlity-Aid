import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-addvoidproperty',
  templateUrl: './addvoidproperty.component.html',
  styleUrls: ['./addvoidproperty.component.css']
})
export class AddvoidpropertyComponent implements OnInit {


  addPropertyForm: any = FormGroup;
  supplierForm: any = FormGroup;
  tenantform: any = FormGroup;
  submitted = false;
  userId : any;
  username : any;
  
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

  constructor(private formBuilder: FormBuilder, private serviceobj: HttpserviceService) { }

  ngOnInit() {
    this.addPropertyForm = this.formBuilder.group({
      propertyAddress: ['', Validators.required],
      propertyPostCode: ['', Validators.required],
      
      // voiddate: ['', Validators.required],
      // association: ['', Validators.required],
      // costCentre: ['', Validators.required],
      // electricMeterType: ['', Validators.required],
      // electricMeterSrNo: ['', Validators.required],
      // electricCard: ['', Validators.required],
      // inType: ['', Validators.required],
      // gasMeterType: ['', Validators.required],
      // readOneGas: ['', Validators.required],
      // gasMeterSrNo: ['', Validators.required],
      // gasCard: ['', Validators.required],
      // gasInType: ['', Validators.required],
      // previousOwnerName: ['', Validators.required],
      // gasDebtOutstanding: ['', Validators.required],
    });

    // this.supplierForm = this.formBuilder.group({
    //   tenantName: ['', Validators.required],
    //   tenantDateMoveIn: ['', Validators.required],
    //   tenantMobile: ['', Validators.required],
    //   tenantLandline: ['', Validators.required],
    //   finalMeterRead: ['', Validators.required],
    // });

    // this.tenantform = this.formBuilder.group({
    //   tenantName: ['', Validators.required],
    //   tenantDateMoveIn: ['', Validators.required],
    //   tenantMobile: ['', Validators.required],
    //   tenantLandline: ['', Validators.required],
    //   finalMeterRead: ['', Validators.required],
    //   finalBilledMeterReading: ['', Validators.required],
    //   finalDualRateLowReading: ['', Validators.required],
    //   finalG: ['', Validators.required],
    //   finalH: ['', Validators.required],
    //   finalJ: ['', Validators.required],
    //   finalS: ['', Validators.required],
    //   finalT: ['', Validators.required],
    // });
    this.serviceobj.getassociation().subscribe((result: any) => {
      // console.log(result)
      this.associationlist = result.results;
    })
  }
  get f() { return this.addPropertyForm.controls; }
  get f1() { return this.tenantform.controls; }
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }


  addImg() {
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

    var first = document.getElementById('dropZoneShow') as HTMLElement;

    if (first?.style.display === "none") {
      first.style.display = "block";

    } else if (first?.style.display === "block") {
      first.style.display = "none";
    }
    // $(".dropZoneShow").show();
    // $(".showDropZone").hide();
    // $(".cancelDropZone").show();

  }
  cancelFun() {
    // $(".dropZoneShow").hide();
    // $(".showDropZone").show();
    // $(".cancelDropZone").hide()
  }
  selectassociation(e: any) {
    console.log(e.target.value)
    //  alert(this.createdBy=e.target.value);
  }
  getImageFromFile(i:number){

// alert(i);
    
    var reader = new FileReader();
    reader.readAsDataURL(this.files[i]); // read file as data url

    reader.onload = (event:any) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    }
    return this.url;
}
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  myFunction() {
    var x = document.getElementById("myDIV") as HTMLInputElement | null;;
    if (x?.style.display === "none") {
      x.style.display = "block";

    } else if (x?.style.display === "block") {
      x.style.display = "none";
    }
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addPropertyForm.invalid) {
      alert("invalid");
      return;
    } else {
      alert("valid");
      let obj = this.addPropertyForm.value;

      
this.userId=sessionStorage.getItem("userId");
this.username=sessionStorage.getItem("username");
      let body=new HttpParams();
      body=body.set("propertyAddress",this.addPropertyForm.propertyAddress)
      body=body.set("propertyAddress",this.addPropertyForm.propertyAddress)
      body=body.set("username",this.username)
      body=body.set("userId",this.userId)
      alert(JSON.stringify(body))

      this.serviceobj.addproperty(obj).subscribe((result) => {
        console.log(result);
        alert(JSON.stringify(result));
      

      });
      //,error =>console.error(error));
    }
  }

  saveSupplierDetails() {
    if (this.supplierForm.invalid) {
      alert("Please fille S the form");
    } else {
      alert("validation Comple");
    }
  }

  // Tbtnsave() {
  //   let obj = this.tenantform.value;
  //   sessionStorage.setItem('username', obj.username);
  //   this.serviceobj.addTenantDetails(obj).subscribe((result) => {
  //     console.log(result);
  //     let obj1 = JSON.parse(JSON.stringify(result.result));
  //     sessionStorage.setItem('type', obj1.type);
  //   },
  //   )
  // }
}
