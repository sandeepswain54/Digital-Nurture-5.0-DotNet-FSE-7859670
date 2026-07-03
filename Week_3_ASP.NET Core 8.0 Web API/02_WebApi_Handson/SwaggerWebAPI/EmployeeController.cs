using Microsoft.AspNetCore.Mvc;

namespace SwaggerWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private static List<Employee> employees = new List<Employee>
        {
            new Employee { Id = 1, Name = "John Doe",   Department = "IT",      Salary = 50000 },
            new Employee { Id = 2, Name = "Jane Smith", Department = "HR",      Salary = 45000 },
            new Employee { Id = 3, Name = "Bob Wilson", Department = "Finance", Salary = 55000 }
        };

        // GET: api/employee
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Employee>> Get()
        {
            return Ok(employees);
        }

        // GET: api/employee/1
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Employee> Get(int id)
        {
            var emp = employees.Find(e => e.Id == id);
            if (emp == null)
                return NotFound("Employee not found!");
            return Ok(emp);
        }

        // POST: api/employee
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult Post([FromBody] Employee employee)
        {
            if (employee == null)
                return BadRequest("Invalid employee data!");
            employees.Add(employee);
            return Ok("Employee added successfully!");
        }

        // PUT: api/employee/1
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(int id, [FromBody] Employee employee)
        {
            var existing = employees.Find(e => e.Id == id);
            if (existing == null)
                return NotFound("Employee not found!");
            existing.Name = employee.Name;
            existing.Department = employee.Department;
            existing.Salary = employee.Salary;
            return Ok("Employee updated successfully!");
        }

        // DELETE: api/employee/1
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(int id)
        {
            var emp = employees.Find(e => e.Id == id);
            if (emp == null)
                return NotFound("Employee not found!");
            employees.Remove(emp);
            return Ok("Employee deleted successfully!");
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public decimal Salary { get; set; }
    }
}