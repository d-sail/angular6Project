import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../shared/employee.service';
import { EmployeeInterface } from '../interfaces/employee';
import { SkillsInterface } from '../interfaces/skills';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router) { }

  employeeForm: FormGroup;
  fullNameLength = 0;
  employee: EmployeeInterface;
  formTitle: string;

  validationMessages = {
    fullName: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be greater than 5 characters.',
      maxlength: 'Full Name must be less than 20 characters.'
    },
    email: {
      required: 'Email is required.'
    },
    // skillName: {
    //   required: 'Skill Name is required.',
    // },
    // experienceInYears: {
    //   required: 'Experience is required.',
    // },
    // proficiency: {
    //   required: 'Proficiency is required.',
    // },
  };

  formErrors = {
    // fullName: '',
    // email: '',
    // skillName: '',
    // experienceInYears: '',
    // proficiency: ''
  };

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });
    this.employeeForm.valueChanges.subscribe((data) => {
      this.fullNameLength = data.fullName.length;
      this.logValidationErrors(this.employeeForm);
    });

    this.route.paramMap.subscribe(param => {
      const empId = +param.get('id');
      if (empId) {
        this.formTitle = 'Update Employee';
        this.getEmployee(empId);
      } else {
        this.formTitle = 'Create Employee';
        this.employee = {
          id: null,
          fullName: '',
          email: '',
          phone: null,
          skills: [],
        };
      }
    });
  }

  getEmployee(id: number) {
    this.employeeService.getEmployeeById(id).subscribe((employee: EmployeeInterface) => {
      this.editEmployee(employee),
        this.employee = employee;
    },
      (err) => console.log('err', err));
  }

  editEmployee(employee: EmployeeInterface) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      email: employee.email,
      phone: employee.phone
    });

    this.employeeForm.setControl('skills', this.setExitingSkills(employee.skills));
  }

  setExitingSkills(skillSets: SkillsInterface[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(skill => {
      formArray.push(this.fb.group({
        skillName: skill.skillName,
        experienceInYears: skill.experienceInYears,
        proficiency: skill.proficiency
      }));
    });
    return formArray;
  }

  addSkillBtnClick(): void {
    (this.employeeForm.get('skills') as FormArray).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  removeSkillsBlock(id: number): void {
    const skillsFormArray = this.employeeForm.get('skills') as FormArray;
    skillsFormArray.removeAt(id);
    skillsFormArray.markAsTouched();
    skillsFormArray.markAsDirty();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  onLoadPatch(): void {
    this.employeeForm.patchValue({
      fullName: 'Somnath Kale',
      email: 'som@test.com',
    });
  }

  onLoadData(): void {
    this.employeeForm.setValue({
      fullName: 'Dwidish Sail',
      email: 'dwi@test.com',
      skills: {
        skillName: 'js',
        expreienceInYears: 2,
        proficience: ''
      }
    });
  }

  onSubmit(): void {
    this.mapUpdatedEmployee();
    if (this.employee.id) {
    this.employeeService.updateEmployee(this.employee).subscribe(
      () => this.router.navigate(['employees']),
      (error: any) => console.log('error', error));
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.router.navigate(['employees']),
        (error: any) => console.log('error', error));
    }
  }

  mapUpdatedEmployee() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.email = this.employeeForm.value.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  }
}

