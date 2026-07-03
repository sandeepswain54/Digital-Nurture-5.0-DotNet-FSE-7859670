using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CustomModelWebAPI.Models;
using CustomModelWebAPI.Filters;

namespace CustomModelWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [CustomAuthFilter]        // Auth filter applied to all methods
    [TypeFilter(typeof(CustomExceptionFilter))]  // Exception filter
    public class EmployeeController : ControllerBase
    {
        // Private method to get standard employee list
        private List<Employee> GetStandardEmployeeList()
        {
            return new List<Employee>
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
        }

        // GET: api/employee
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<List<Employee>> GetStandard()
        {
            var employees = GetStandardEmployeeList();
            return Ok(employees);
        }

        // GET: api/employee/1
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Employee> Get(int id)
        {
            var employees = GetStandardEmployeeList();
            var employee = employees.Find(e => e.Id == id);
            if (employee == null)
                return NotFound("Employee not found!");
            return Ok(employee);
        }

        // POST: api/employee
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult Post([FromBody] Employee employee)
        {
            if (employee == null)
                return BadRequest("Invalid employee data!");
            return Ok("Employee added successfully!");
        }

        // PUT: api/employee/1
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(int id, [FromBody] Employee employee)
        {
            if (employee == null)
                return NotFound("Employee not found!");
            return Ok("Employee updated successfully!");
        }
    }
}