using Moq;
using NUnit.Framework;
using ConverterLib;

namespace ConverterLib.Tests
{
    [TestFixture]
    public class ConverterTests
    {
        [Test]
        public void USDToEuro_ValidAmount_ReturnsConvertedValue()
        {
            var mockFeed = new Mock<IDollarToEuroExchangeRateFeed>();
            mockFeed.Setup(feed => feed.GetRate()).Returns(0.92);

            var converter = new Converter(mockFeed.Object);
            double actual = converter.USDToEuro(100);

            Assert.That(actual, Is.EqualTo(92).Within(0.01));
        }

        [Test]
        public void USDToEuro_ZeroAmount_ReturnsZero()
        {
            var mockFeed = new Mock<IDollarToEuroExchangeRateFeed>();
            mockFeed.Setup(feed => feed.GetRate()).Returns(0.92);

            var converter = new Converter(mockFeed.Object);
            double actual = converter.USDToEuro(0);

            Assert.That(actual, Is.EqualTo(0));
        }

        [Test]
        public void USDToEuro_DifferentExchangeRate_ReturnsCorrectValue()
        {
            var mockFeed = new Mock<IDollarToEuroExchangeRateFeed>();
            mockFeed.Setup(feed => feed.GetRate()).Returns(0.85);

            var converter = new Converter(mockFeed.Object);
            double actual = converter.USDToEuro(50);

            Assert.That(actual, Is.EqualTo(42.5).Within(0.01));
        }

        [Test]
        public void USDToEuro_VerifiesExchangeRateFeedIsCalledOnce()
        {
            var mockFeed = new Mock<IDollarToEuroExchangeRateFeed>();
            mockFeed.Setup(feed => feed.GetRate()).Returns(0.9);

            var converter = new Converter(mockFeed.Object);
            converter.USDToEuro(10);

            mockFeed.Verify(feed => feed.GetRate(), Times.Once);
        }
    }
}
