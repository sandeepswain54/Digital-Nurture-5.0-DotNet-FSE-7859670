using System.Linq;
using NUnit.Framework;
using CollectionsLib;

namespace CollectionsLib.Tests
{
    [TestFixture]
    public class EmployeeRepositoryTests
    {
        private EmployeeRepository _repository;

        [SetUp]
        public void Setup()
        {
            _repository = new EmployeeRepository();
        }

        [Test]
        public void GetEmployees_ReturnsCollection_WithNoNullValues()
        {
            var employees = _repository.GetEmployees();
            CollectionAssert.AllItemsAreNotNull(employees);
        }

        [Test]
        public void GetEmployees_ReturnsCollection_ContainingEmployeeWithId100()
        {
            var employees = _repository.GetEmployees();
            bool exists = employees.Any(e => e.Id == 100);
            Assert.That(exists, Is.True);
        }

        [Test]
        public void GetEmployees_ReturnsCollection_WithUniqueEmployees()
        {
            var employees = _repository.GetEmployees();
            CollectionAssert.AllItemsAreUnique(employees);
        }

        [Test]
        public void GetEmployeesAndPreviousYearEmployees_AreNotEquivalent_ClassicModel()
        {
            var allEmployees = _repository.GetEmployees();
            var previousYearEmployees = _repository.GetEmployeesWhoJoinedInPreviousYears();

            CollectionAssert.AreNotEqual(allEmployees, previousYearEmployees);
        }

        [Test]
        public void GetEmployeesAndPreviousYearEmployees_AreNotEquivalent_ConstraintModel()
        {
            var allEmployees = _repository.GetEmployees();
            var previousYearEmployees = _repository.GetEmployeesWhoJoinedInPreviousYears();

            Assert.That(allEmployees, Is.Not.EquivalentTo(previousYearEmployees));
        }
    }
}
