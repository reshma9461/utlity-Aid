import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { AddvoidpropertyComponent } from './addvoidproperty/addvoidproperty.component';
import { AssociationComponent } from './association/association.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ClientsComponent } from './clients/clients.component';
import { EditclientComponent } from './editclient/editclient.component';
import { EditmanagerComponent } from './editmanager/editmanager.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AuthGuard } from './guard/auth.guard';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagersComponent } from './managers/managers.component';
import { PropertyeditComponent } from './propertyedit/propertyedit.component';
import { PropertylistingComponent } from './propertylisting/propertylisting.component';
import { RegisterComponent } from './register/register.component';
import { SampleComponent } from './sample/sample.component';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  
{
  path: '', 
  pathMatch: 'full', 
  redirectTo: '/login',
},
{
  path:'header', 
  component:HeaderComponent,
  canActivate: [AuthGuard]

},
{
  path:'login', 
  component:LoginComponent,

},
{
  path:'home', 
  component:HomeComponent,
  canActivate: [AuthGuard]
  
},
{
  path:'propertylisting', 
  component:PropertylistingComponent,
  canActivate: [AuthGuard]

},
{
  path:'addvoidproperty', 
  component:AddvoidpropertyComponent,
  canActivate: [AuthGuard],
  

},
{
  path:'users', 
  component:UsersComponent,
  canActivate: [AuthGuard]

},
{
  path:'clients', 
  component:ClientsComponent,
  canActivate: [AuthGuard]

},
{
  path:'managers', 
  component:ManagersComponent,
  canActivate: [AuthGuard]

},
{
  path:'association', 
  component:AssociationComponent,
  canActivate: [AuthGuard]

},
{
  path:'register', 
  component:RegisterComponent,
  canActivate: [AuthGuard]

},
{
  path:'changepassword', 
  component:ChangepasswordComponent,
  canActivate: [AuthGuard]

},
{
  path:'addproperty', 
  component:AddpropertyComponent,
  canActivate: [AuthGuard]

},
{
  path:'test', 
  component:TestComponent
},
{
  path:'sample', 
  component:SampleComponent
},
{
  path:'edituser', 
  component:EdituserComponent,
  canActivate: [AuthGuard]

},
{
  path:'editmanager', 
  component:EditmanagerComponent,
  canActivate: [AuthGuard]

},
{
  path:'editclient', 
  component:EditclientComponent,
  canActivate: [AuthGuard]

},
{
  path:'propertyedit', 
  component:PropertyeditComponent,
  canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
