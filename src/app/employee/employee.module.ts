import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent
   ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
