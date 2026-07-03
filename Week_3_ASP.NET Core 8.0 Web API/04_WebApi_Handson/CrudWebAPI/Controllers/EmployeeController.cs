using CrudWebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CrudWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        // Hardcoded employee list
        private static List<Employee> _employees = new List<Employee>
        {
            new Employee
            {
                Id = 1,
                Name = "John Doe",
                Salary = 50000,
                Permanent = true,
                DateOfBirth = new DateTime(1990, 5, 15),
                Department = new Department { Id = 1, Name = "IT" },
                Skills = new List<Skill>
                {
                    new Skill { Id = 1, Name = "C#" },
                    new Skill { Id = 2, Name = ".NET" }
                }
            },
            new Employee
            {
                Id = 2,
                Name = "Jane Smith",
                Salary = 45000,
                Permanent = false,
                DateOfBirth = new DateTime(1992, 8, 20),
                Department = new Department { Id = 2, Name = "HR" },
                Skills = new List<Skill>
                {
                    new Skill { Id = 3, Name = "Recruitment" },
                    new Skill { Id = 4, Name = "Training" }
                }
            },
            new Employee
            {
                Id = 3,
                Name = "Bob Wilson",
                Salary = 55000,
                Permanent = true,
                DateOfBirth = new DateTime(1988, 3, 10),
                Department = new Department { Id = 3, Name = "Finance" },
                Skills = new List<Skill>
                {
                    new Skill { Id = 5, Name = "Accounting" },
                    new Skill { Id = 6, Name = "Excel" }
                }
            }
        };

        // GET: api/employee
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<Employee>> Get()
        {
            return Ok(_employees);
        }

        // GET: api/employee/1
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Employee> Get(int id)
        {
            // Check if id is valid
            if (id <= 0)
                return BadRequest("Invalid employee id");

            var employee = _employees.Find(e => e.Id == id);
            if (employee == null)
                return BadRequest("Invalid employee id");

            return Ok(employee);
        }

        // POST: api/employee
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Employee> Post([FromBody] Employee employee)
        {
            if (employee == null)
                return BadRequest("Invalid employee data!");

            // Auto assign new ID
            employee.Id = _employees.Count + 1;
            _employees.Add(employee);
            return Ok(employee);
        }

        // PUT: api/employee/1
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Employee> Put(int id, [FromBody] Employee employee)
        {
            // Check if id is valid
            if (id <= 0)
                return BadRequest("Invalid employee id");

            // Check if employee exists in list
            var existing = _employees.Find(e => e.Id == id);
            if (existing == null)
                return BadRequest("Invalid employee id");

            // Update employee data from input body
            existing.Name = employee.Name;
            existing.Salary = employee.Salary;
            existing.Permanent = employee.Permanent;
            existing.Department = employee.Department;
            existing.Skills = employee.Skills;
            existing.DateOfBirth = employee.DateOfBirth;

            // Return updated employee
            var updated = _employees.Find(e => e.Id == id);
            return Ok(updated);
        }

        // DELETE: api/employee/1
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Employee> Delete(int id)
        {
            // Check if id is valid
            if (id <= 0)
                return BadRequest("Invalid employee id");

            var employee = _employees.Find(e => e.Id == id);
            if (employee == null)
                return BadRequest("Invalid employee id");

            _employees.Remove(employee);
            return Ok(employee);
        }
    }
}