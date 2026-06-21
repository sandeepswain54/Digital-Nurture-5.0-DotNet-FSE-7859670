using System;
using NUnit.Framework;
using UtilLib;

namespace UtilLib.Tests
{
    [TestFixture]
    public class UrlHostNameParserTests
    {
        private UrlHostNameParser _parser;

        [SetUp]
        public void Setup()
        {
            _parser = new UrlHostNameParser();
        }

        [Test]
        public void ParseHostName_UrlWithProtocol_ReturnsHostName()
        {
            string actual = _parser.ParseHostName("https://www.example.com/path/page");
            Assert.That(actual, Is.EqualTo("www.example.com"));
        }

        [Test]
        public void ParseHostName_UrlWithoutProtocol_ReturnsHostName()
        {
            string actual = _parser.ParseHostName("www.example.com/path/page");
            Assert.That(actual, Is.EqualTo("www.example.com"));
        }

        [Test]
        public void ParseHostName_EmptyUrl_ThrowsArgumentException()
        {
            Assert.That(() => _parser.ParseHostName(""), Throws.TypeOf<ArgumentException>());
        }
    }
}
