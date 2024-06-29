import { defineStore } from 'pinia';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [
      { id: 1, name: 'John Doe', gender: 'Male', age: 22, position: 'Developer', salary: 20000 },
      { id: 2, name: 'Jane Smith', gender: 'Female', age: 21, position: 'Ux/ui', salary: 17000 },
      { id: 3, name: 'Steve Roger', gender: 'Male', age: 25, position: 'Tester', salary: 20000 },
      { id: 4, name: 'Natacha Romanof', gender: 'Female', age: 25, position: 'Back-end', salary: 24000 },
      { id: 5, name: 'mongkon yindee', gender: 'Female', age: 25, position: 'Back-end', salary: 24000 },
      { id: 6, name: 'Natalee ocha', gender: 'Female', age: 25, position: 'Back-end', salary: 24000 },
      { id: 7, name: 'pongsak ruksuk', gender: 'Female', age: 25, position: 'Back-end', salary: 24000 },
      { id: 8, name: 'prayad mede', gender: 'Female', age: 25, position: 'Back-end', salary: 24000 },
      { id: 9, name: 'somchai saysmo', gender: 'Female', age: 25, position: 'Back-end', salary: 24000 },
      { id: 10, name: 'somsri deejai', gender: 'Female', age: 25, position: 'Back-end', salary: 24000 },
      { id: 11, name: 'wanpen yuyen', gender: 'Female', age: 25, position: 'Back-end', salary: 24000 },
    ],
  }),
  actions: {
    addEmployee(newEmployee) {
      newEmployee.id = this.employees.length + 1;
      this.employees.push(newEmployee);
    },
    deleteEmployee(employeeId) {
      this.employees = this.employees.filter(employee => employee.id !== employeeId);
    },
  },
});
