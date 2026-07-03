using JwtWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,POC")]   // JWT Authorization
    public class EmployeeController : ControllerBase
    {
        private static List<Employee> _employees = new List<Employee>
        {
            new Employee
            {
                Id = 1, Name = "John Doe", Salary = 50000, Permanent = true,
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
                Id = 2, Name = "Jane Smith", Salary = 45000, Permanent = false,
                DateOfBirth = new DateTime(1992, 8, 20),
                Department = new Department { Id = 2, Name = "HR" },
                Skills = new List<Skill>
                {
                    new Skill { Id = 3, Name = "Recruitment" },
                    new Skill { Id = 4, Name = "Training" }
                }
            }
        };

        // GET: api/employee
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
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
            if (id <= 0)
                return BadRequest("Invalid employee id");
            var emp = _employees.Find(e => e.Id == id);
            if (emp == null)
                return BadRequest("Invalid employee id");
            return Ok(emp);
        }

        // PUT: api/employee/1
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Employee> Put(int id, [FromBody] Employee employee)
        {
            if (id <= 0)
                return BadRequest("Invalid employee id");
            var existing = _employees.Find(e => e.Id == id);
            if (existing == null)
                return BadRequest("Invalid employee id");
            existing.Name = employee.Name;
            existing.Salary = employee.Salary;
            existing.Permanent = employee.Permanent;
            existing.Department = employee.Department;
            existing.Skills = employee.Skills;
            existing.DateOfBirth = employee.DateOfBirth;
            return Ok(existing);
        }

        // DELETE: api/employee/1
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Employee> Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid employee id");
            var emp = _employees.Find(e => e.Id == id);
            if (emp == null)
                return BadRequest("Invalid employee id");
            _employees.Remove(emp);
            return Ok(emp);
        }
    }
}