using NUnit.Framework;
using CalcLibrary;

namespace CalcLibrary.Tests
{
    [TestFixture]
    public class CalculatorTests
    {
        private Calculator _calculator;

        [SetUp]
        public void Setup()
        {
            _calculator = new Calculator();
        }

        [TearDown]
        public void Cleanup()
        {
            _calculator = null;
        }

        [TestCase(2, 3, 5)]
        [TestCase(-1, 1, 0)]
        [TestCase(0, 0, 0)]
        [TestCase(10.5, 2.5, 13)]
        public void Add_TwoNumbers_ReturnsSum(double a, double b, double expected)
        {
            double actual = _calculator.Add(a, b);
            Assert.That(actual, Is.EqualTo(expected));
        }
    }
}
