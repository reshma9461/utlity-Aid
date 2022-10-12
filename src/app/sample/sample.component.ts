import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})


export class SampleComponent implements OnInit {


  fileToUpload: File | null = null;
  constructor(private sanitizer:DomSanitizer) { }
  imagelist:any=[];
  ngOnInit(): void {
  }

handleFileInput(event:any) {
  // const files= event.target.files
  // console.log(event)
  if (event.target.files) {
    // const reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (e: any) => {
    //   this.imagelist.push(e.target.result);
    // };

    const file= event.target.files[0];
  } 
}

onSelect(event: any) {
      console.log(event);
      this.imagelist.push(...event.addedFiles);
    }
  
    onRemove(event: any) {
      console.log(event);
      this.imagelist.splice(this.imagelist.indexOf(event), 1);
    }
  

}
