import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';
import { HttpserviceService } from '../httpservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-propertylisting',
  templateUrl: './propertylisting.component.html',
  styleUrls: ['./propertylisting.component.css']
})
export class PropertylistingComponent implements OnInit {

  usernamelist: any = [];
  propertylist: any = [];
  p: any
  searchForm: any = FormGroup;
  date: any;
  createdBy: any;
  createdFrom: any;
  datepipe: any;
  latest_date: any

  currentPage: any;
  endPageLimit: any;
  btnNames: any = [];
  count:any=[];
  date1:any;
  currentUserType: any;
  sss: any;

  userlist:any=[];
  
  constructor(private serviceobj: HttpserviceService, private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit(): void {
     
    // this.showSpinner();
    this.searchForm = this.formBuilder.group({
      createdBy: [''],
      status: [''],
      propertyAddress: [''],
      propertyPostCode: [''],
      createdFrom: [''],
      createdTo: [''],
      uniqueNo: [''],
      costCentre: [''],
    });

    this.serviceobj.getusername().subscribe((result: any) => {
      console.log(result)
      this.usernamelist = result.results;
    })
    let body = {
      type: sessionStorage.getItem("type"),
      association:sessionStorage.getItem("association"),
      createdById:sessionStorage.getItem("createdById"),
    }
    alert(body)
    this.serviceobj.getpropertylist(body).subscribe((result: any) => {
      // console.log(result);
      // alert(result.addedBy);
      // console.log(result.addedBy);
      this.userlist=result.addedBy;
      console.log(this.userlist);
      this.propertylist = result.response;
      this.endPageLimit = result.pages;
      this.count=result.count;
      // this.spinnerService.hide();
    })

    this.currentPage = 1;
    for (var i = 0; i < 9; i++) {
      if (i == 0) {
        this.btnNames.push("First");
      } else if (i == 7) {
        this.btnNames.push(">>");
      }else if (i == 8) {
        this.btnNames.push("Last");
      } else {
        this.btnNames.push(i);
      }
    }
    this.serviceobj.loggedInUserType$.subscribe(val => {
      this.currentUserType = val;
      // alert("in pro: " +this.currentUserType)
    })
  }

  changeUser(e: any) {
    console.log(e.target.value)
    alert(this.createdBy = e.target.value);
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.propertylist = pageOfItems;
  }
  OnPageChange(sss: any) {
    // alert(sss)
    this.p = sss;
  }
  extractUsername(obj: any) {
    try {
      let a = JSON.parse(JSON.stringify(obj));
      // alert(a.username)
      return a.username;
    } catch {
      return "";
    }
  }
  extractassociation(obj: any) {
    try {
      let a = JSON.parse(JSON.stringify(obj));
      // alert(a.username)
      return a.association;
    } catch {
      return "";
    }
  }
  // *****************************************************************************
  searchClick() {
    // alert(JSON.stringify(this.searchForm.value));
    var createdfrom = this.searchForm.value.createdFrom;
    this.searchForm.value.createdFrom=(new Date(createdfrom).getTime())/1000;

    var createdTo = this.searchForm.value.createdTo;
    this.searchForm.value.createdTo=(new Date(createdTo).getTime())/1000;
    // alert(this.searchForm.value.createdTo)

    let data = JSON.stringify(this.searchForm.value);
    let body = {
      type: sessionStorage.getItem("type"),
      search: data,
    }

    this.serviceobj.getsearch(body).subscribe((result: any) => {
      this.propertylist = result.response;
      this.endPageLimit=result.pages;
      console.log(JSON.stringify(this.propertylist));
    })
  }
// ********************************************************************************
  deleteUser(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // objectId
        let body = {
          objectId: id
        }
        this.serviceobj.deleteProperty(body).subscribe((result: any) => {
          console.log(result);
          if (result.status == "success") {
            let body = {
              type: sessionStorage.getItem("type")
            }
            this.serviceobj.getpropertylist(body).subscribe((result: any) => {
              this.propertylist = result.response;
              // alert(this.propertylist.length)
              console.log(JSON.stringify(result.response));
            })
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Record Has Been Deleted',
              showConfirmButton: false,
              timer: 2000
            })
          }
        })
      }
    })
  }
  // *****************************************************************************
  editProperty(id: any) {
    this.router.navigateByUrl('propertyedit?id=' + id);
  }
  // *****************************************************************************
  isCurrentpage(name: any) {
    if (this.currentPage == name) {
      return true;
    } else {
      return false
    }
  }

  btnClick(name: any) {
    
    if (name == "<<") {
      this.currentPage = this.currentPage - 1;

    } else if (name == ">>") {
      this.currentPage = this.currentPage + 1;

    } else
      if (name == "First") {
        this.currentPage = 1;

      } else if (name == "Last") {
        this.currentPage = this.endPageLimit;

      } else {
        this.currentPage = name;
      }

      
    let body = {
      type: sessionStorage.getItem("type"),
      search: '{"page":' + this.currentPage + '}',
    }
    this.serviceobj.getsearch(body).subscribe((result: any) => {
      this.propertylist = result.response;
      this.endPageLimit = result.pages;
      // console.log("dfghjkfghjkl" + JSON.stringify(result))
    })

    var btnNameStartLimit;
    var btnNameEndLimit;

    btnNameStartLimit = this.currentPage - 4;
    btnNameEndLimit = this.currentPage + 5;

    this.btnNames = [];
    this.btnNames.push("First");
    this.btnNames.push("<<");
    var i;
    for (i = btnNameStartLimit; i < btnNameEndLimit; i++) {
      if (i! > 0 && i < (this.endPageLimit + 1)) {
        this.btnNames.push(i);
      }
    }
    if (i < (this.endPageLimit + 1)) {
      this.btnNames.push(">>");
      this.btnNames.push("Last");
    }
    if (btnNameStartLimit <= 1) {
      this.btnNames = this.btnNames.slice(1, this.btnNames.length);
      this.btnNames = this.btnNames.slice(1, this.btnNames.length);

    }
  }
}

