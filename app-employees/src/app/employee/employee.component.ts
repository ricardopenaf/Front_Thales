import { Component } from '@angular/core';
import { Employee } from './employee.model';  
import { EmployeeService } from './employee.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
],

  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employeeId: string = '';
  employees: Employee[] = []; 
  displayedColumns: string[] = ['id', 'firstName','lastName','email', 'contactNumber', 'age','salary','address', 'annualSalary'];
  loading: boolean = false; 
  errorMessage: string = '';

  ngOnInit() {
    this.getAllEmployeesOnInit();
  }
  constructor(private employeeService: EmployeeService) { }

  getAllEmployeesOnInit() {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        if (data) {
          this.employees = data;
        } else {
          this.employees = [];
          this.errorMessage = 'No data found!!!';
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'No data found. Please try again or review the connection!!';
        console.error('Error fetching employees:', error);
        this.loading = false;
      }
      
    });
  }
  searchEmployees() {
    this.loading = true;
    this.errorMessage = ''; // Asumiendo que tienes una propiedad para mensajes de error
  
    if (this.employeeId) {
      const employeeIdNumber = +this.employeeId;
      this.employeeService.getEmployeeById(employeeIdNumber).subscribe({
        next: (data: Employee) => {
          if (data) {
            this.employees = [data];
          } else {
            this.employees = [];
            this.errorMessage = 'No data found!!!';
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al obtener el empleado:', error);
          this.employees = [];
          this.errorMessage = 'No data found!!!';
          this.loading = false;
        },
        complete: () => {
          console.log('Finalizó la obtención del empleado');
          this.loading = false;
        }
      });
    } else {
      this.getAllEmployeesOnInit();
      this.loading = false;
    }
  }
}