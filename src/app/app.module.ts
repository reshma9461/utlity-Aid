import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertylistingComponent } from './propertylisting/propertylisting.component';
import { AddvoidpropertyComponent } from './addvoidproperty/addvoidproperty.component';
import { UsersComponent } from './users/users.component';
import { ClientsComponent } from './clients/clients.component';
import { AssociationComponent } from './association/association.component';
import { ManagersComponent } from './managers/managers.component';
import { RegisterComponent } from './register/register.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { TestComponent } from './test/test.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SampleComponent } from './sample/sample.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { EdituserComponent } from './edituser/edituser.component';
import { PropertyeditComponent } from './propertyedit/propertyedit.component';
import { EditclientComponent } from './editclient/editclient.component';
import { EditmanagerComponent } from './editmanager/editmanager.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './spinner.interceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthGuard } from './guard/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    PropertylistingComponent,
    AddvoidpropertyComponent,
    UsersComponent,
    ClientsComponent,
    AssociationComponent,
    ManagersComponent,
    RegisterComponent,
    ChangepasswordComponent,
    TestComponent,
    AddpropertyComponent,
    SampleComponent,
    EdituserComponent,
    PropertyeditComponent,
    EditclientComponent,
    EditmanagerComponent,
    
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    NgxDropzoneModule,
    MatGridListModule,    
    NgxSpinnerModule,
    MatProgressSpinnerModule
  ],
  providers: [
    [AuthGuard],    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
   },
   
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
