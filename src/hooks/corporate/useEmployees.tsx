
import { useState } from 'react';
import { Employee } from '@/types/corporate';

export const useEmployees = (
  accountEmployees: Employee[], 
  updateEmployees: (employees: Employee[]) => void
) => {
  const addEmployee = (employee: Employee) => {
    const updatedEmployees = [...accountEmployees, employee];
    updateEmployees(updatedEmployees);
  };

  return {
    addEmployee
  };
};
