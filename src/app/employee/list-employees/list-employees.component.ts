import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../shared/employee.service';
import { EmployeeInterface } from '../interfaces/employee';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {

  employees: EmployeeInterface[];

  constructor(private employeeService: EmployeeService,
              private route: Router) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((listEmployees) => {
      this.employees = listEmployees;
    });
  }

  onClickEdit(empId: number) {
      this.route.navigate(['/employees/edit', empId]);
  }

}
