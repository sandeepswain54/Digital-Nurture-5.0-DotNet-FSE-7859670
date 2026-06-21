using System;
using System.Collections.Generic;
using System.Linq;

namespace CollectionsLib
{
    public class EmployeeRepository
    {
        public List<Employee> GetEmployees()
        {
            return new List<Employee>
            {
                new Employee { Id = 100, Name = "Alice", JoinDate = new DateTime(2022, 5, 10) },
                new Employee { Id = 101, Name = "Bob", JoinDate = new DateTime(2021, 3, 15) },
                new Employee { Id = 102, Name = "Charlie", JoinDate = DateTime.Now }
            };
        }

        public List<Employee> GetEmployeesWhoJoinedInPreviousYears()
        {
            int currentYear = DateTime.Now.Year;
            return GetEmployees().Where(e => e.JoinDate.Year < currentYear).ToList();
        }
    }
}
