using System;
using Moq;
using NUnit.Framework;
using PlayersManagerLib;

namespace PlayersManagerLib.Tests
{
    [TestFixture]
    public class PlayerTests
    {
        private Mock<IPlayerMapper> _mockPlayerMapper;

        [OneTimeSetUp]
        public void Init()
        {
            _mockPlayerMapper = new Mock<IPlayerMapper>();
            _mockPlayerMapper
                .Setup(mapper => mapper.IsPlayerNameExistsInDb(It.IsAny<string>()))
                .Returns(false);
        }

        [TestCase("Virat", 23, "India", 30)]
        public void RegisterNewPlayer_NewPlayerName_ReturnsPlayerWithExpectedAttributes(
            string name, int expectedAge, string expectedCountry, int expectedMatches)
        {
            Player actual = Player.RegisterNewPlayer(name, _mockPlayerMapper.Object);

            Assert.That(actual.Name, Is.EqualTo(name));
            Assert.That(actual.Age, Is.EqualTo(expectedAge));
            Assert.That(actual.Country, Is.EqualTo(expectedCountry));
            Assert.That(actual.NoOfMatches, Is.EqualTo(expectedMatches));
        }

        [Test]
        public void RegisterNewPlayer_EmptyName_ThrowsArgumentException()
        {
            Assert.That(() => Player.RegisterNewPlayer("", _mockPlayerMapper.Object),
                Throws.TypeOf<ArgumentException>());
        }

        [Test]
        public void RegisterNewPlayer_NameAlreadyExists_ThrowsArgumentException()
        {
            var mockExistingPlayerMapper = new Mock<IPlayerMapper>();
            mockExistingPlayerMapper
                .Setup(mapper => mapper.IsPlayerNameExistsInDb(It.IsAny<string>()))
                .Returns(true);

            Assert.That(() => Player.RegisterNewPlayer("Virat", mockExistingPlayerMapper.Object),
                Throws.TypeOf<ArgumentException>());
        }
    }
}
