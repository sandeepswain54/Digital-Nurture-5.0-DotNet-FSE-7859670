using System;
using NUnit.Framework;
using AccountsManagerLib;

namespace AccountsManagerLib.Tests
{
    [TestFixture]
    public class AccountManagerTests
    {
        private AccountManager _accountManager;

        [SetUp]
        public void Setup()
        {
            _accountManager = new AccountManager();
        }

        [Test]
        public void Login_ValidCredentials_ReturnsWelcomeMessage()
        {
            string actual = _accountManager.Login("user_11", "secret@user11");
            Assert.That(actual, Is.EqualTo("Welcome user_11!!!"));
        }

        [Test]
        public void Login_SecondValidUser_ReturnsWelcomeMessage()
        {
            string actual = _accountManager.Login("user_22", "secret@user22");
            Assert.That(actual, Is.EqualTo("Welcome user_22!!!"));
        }

        [Test]
        public void Login_InvalidCredentials_ReturnsErrorMessage()
        {
            string actual = _accountManager.Login("user_11", "wrongpassword");
            Assert.That(actual, Is.EqualTo("Invalid user id/password"));
        }

        [Test]
        public void Login_MissingUserId_ThrowsArgumentException()
        {
            Assert.That(() => _accountManager.Login("", "secret@user11"), Throws.TypeOf<ArgumentException>());
        }

        [Test]
        public void Login_MissingPassword_ThrowsArgumentException()
        {
            Assert.That(() => _accountManager.Login("user_11", ""), Throws.TypeOf<ArgumentException>());
        }
    }
}
