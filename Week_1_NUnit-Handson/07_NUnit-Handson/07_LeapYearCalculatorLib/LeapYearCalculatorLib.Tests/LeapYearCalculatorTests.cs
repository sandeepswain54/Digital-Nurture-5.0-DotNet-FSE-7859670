using NUnit.Framework;
using LeapYearCalculatorLib;

namespace LeapYearCalculatorLib.Tests
{
    [TestFixture]
    public class LeapYearCalculatorTests
    {
        private LeapYearCalculator _calculator;

        [SetUp]
        public void Setup()
        {
            _calculator = new LeapYearCalculator();
        }

        [TestCase(2000, 1)]
        [TestCase(2024, 1)]
        [TestCase(1996, 1)]
        public void IsLeapYear_LeapYear_ReturnsOne(int year, int expected)
        {
            int actual = _calculator.IsLeapYear(year);
            Assert.That(actual, Is.EqualTo(expected));
        }

        [TestCase(1900, 0)]
        [TestCase(2023, 0)]
        [TestCase(2021, 0)]
        public void IsLeapYear_NotLeapYear_ReturnsZero(int year, int expected)
        {
            int actual = _calculator.IsLeapYear(year);
            Assert.That(actual, Is.EqualTo(expected));
        }

        [TestCase(1752, -1)]
        [TestCase(10000, -1)]
        public void IsLeapYear_InvalidYearRange_ReturnsMinusOne(int year, int expected)
        {
            int actual = _calculator.IsLeapYear(year);
            Assert.That(actual, Is.EqualTo(expected));
        }
    }
}
