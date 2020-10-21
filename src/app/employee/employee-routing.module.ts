import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

const empRoutes: Routes = [
  { path: '', component: ListEmployeesComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: 'edit/:id', component: CreateEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(empRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
