using Moq;
using NUnit.Framework;
using CustomerCommLib;

namespace CustomerCommLib.Tests
{
    [TestFixture]
    public class CustomerCommTests
    {
        private Mock<IMailSender> _mockMailSender;
        private CustomerComm _customerComm;

        [OneTimeSetUp]
        public void Init()
        {
            _mockMailSender = new Mock<IMailSender>();
            _mockMailSender
                .Setup(sender => sender.SendMail(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(true);

            _customerComm = new CustomerComm(_mockMailSender.Object);
        }

        [TestCase]
        public void SendMailToCustomer_ValidMailSender_ReturnsTrue()
        {
            bool actual = _customerComm.SendMailToCustomer();
            Assert.That(actual, Is.True);
        }
    }
}
