import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeInterface } from '../employee/interfaces/employee';
import { SkillsInterface } from '../employee/interfaces/skills';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:3000/employees';

  getEmployees(): Observable<EmployeeInterface[]> {
    return this.httpClient.get<EmployeeInterface[]>(this.baseUrl);
  }

  getEmployeeById(id: number): Observable<EmployeeInterface> {
    return this.httpClient.get<EmployeeInterface>(`${this.baseUrl}/${id}`);
  }

  updateEmployee(employee: EmployeeInterface): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee);
  }

  addEmployee(employee: EmployeeInterface): Observable<EmployeeInterface> {
    return this.httpClient.post<EmployeeInterface>(this.baseUrl, employee);
  }
}
