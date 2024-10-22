// employee.model.ts
export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    age: string;
    salary: string;
    address: string;
    annualSalary: number;
  
    constructor(id: number, Firstname: string, Lastname: string, Email:string, Contactnumber: string, Age: string, Salary: string, 
     Address: string, Employee_anual_salary: number) {
      this.id = id;
      this.firstName = Firstname;
      this.lastName=Lastname;
      this.email=Email;
      this.contactNumber=Contactnumber;
      this.age=Age;
      this.salary=Salary;
      this.address=Address;
      this.annualSalary = Employee_anual_salary;
    }
  }
  