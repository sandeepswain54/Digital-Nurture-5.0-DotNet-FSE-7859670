using System;
using NUnit.Framework;
using UserManagerLib;

namespace UserManagerLib.Tests
{
    [TestFixture]
    public class UserManagerTests
    {
        private UserManager _userManager;

        [SetUp]
        public void Setup()
        {
            _userManager = new UserManager();
        }

        [Test]
        public void CreateUser_ValidPanCardNo_ReturnsSuccessMessage()
        {
            string actual = _userManager.CreateUser("ABCDE1234F");
            Assert.That(actual, Is.EqualTo("User created successfully with PAN ABCDE1234F"));
        }

        [Test]
        public void CreateUser_NullPanCardNo_ThrowsNullReferenceException()
        {
            Assert.That(() => _userManager.CreateUser(null), Throws.TypeOf<NullReferenceException>());
        }

        [Test]
        public void CreateUser_InvalidLengthPanCardNo_ThrowsFormatException()
        {
            Assert.That(() => _userManager.CreateUser("SHORT123"), Throws.TypeOf<FormatException>());
        }
    }
}
