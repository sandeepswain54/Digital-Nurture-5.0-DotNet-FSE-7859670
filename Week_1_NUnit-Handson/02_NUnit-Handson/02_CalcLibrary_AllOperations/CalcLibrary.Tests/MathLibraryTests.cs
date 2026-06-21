using System;
using NUnit.Framework;
using CalcLibrary;

namespace CalcLibrary.Tests
{
    [TestFixture]
    public class MathLibraryTests
    {
        private MathLibrary _mathLibrary;

        [SetUp]
        public void Setup()
        {
            _mathLibrary = new MathLibrary();
        }

        [TearDown]
        public void Cleanup()
        {
            _mathLibrary = null;
        }

        [TestCase(10, 3, 7)]
        [TestCase(0, 5, -5)]
        [TestCase(-4, -6, 2)]
        public void Subtract_TwoNumbers_ReturnsDifference(double a, double b, double expected)
        {
            double actual = _mathLibrary.Subtract(a, b);
            Assert.That(actual, Is.EqualTo(expected));
        }

        [TestCase(4, 5, 20)]
        [TestCase(0, 8, 0)]
        [TestCase(-3, 6, -18)]
        public void Multiply_TwoNumbers_ReturnsProduct(double a, double b, double expected)
        {
            double actual = _mathLibrary.Multiply(a, b);
            Assert.That(actual, Is.EqualTo(expected));
        }

        [TestCase(10, 2, 5)]
        [TestCase(9, 3, 3)]
        [TestCase(-12, 4, -3)]
        public void Divide_TwoNumbers_ReturnsQuotient(double a, double b, double expected)
        {
            double actual = _mathLibrary.Divide(a, b);
            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public void Divide_ByZero_ThrowsArgumentExceptionWithMessage()
        {
            try
            {
                _mathLibrary.Divide(10, 0);
                Assert.Fail("Division by zero");
            }
            catch (ArgumentException ex)
            {
                Assert.That(ex.Message, Is.EqualTo("Division by zero"));
            }
        }

        [Test]
        public void TestAddAndClear()
        {
            double addResult = _mathLibrary.Add(5, 5);
            Assert.That(addResult, Is.EqualTo(10));

            _mathLibrary.AllClear();
            Assert.That(_mathLibrary.GetResult, Is.EqualTo(0));
        }
    }
}
