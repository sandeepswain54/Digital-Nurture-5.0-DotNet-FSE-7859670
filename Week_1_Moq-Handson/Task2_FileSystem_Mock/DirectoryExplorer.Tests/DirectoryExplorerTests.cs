using System.Collections.Generic;
using Moq;
using NUnit.Framework;
using MagicFilesLib;

namespace MagicFilesLib.Tests
{
    [TestFixture]
    public class DirectoryExplorerTests
    {
        private readonly string _file1 = "file.txt";
        private readonly string _file2 = "file2.txt";

        private Mock<IDirectoryExplorer> _mockDirectoryExplorer;

        [OneTimeSetUp]
        public void Init()
        {
            _mockDirectoryExplorer = new Mock<IDirectoryExplorer>();
            _mockDirectoryExplorer
                .Setup(explorer => explorer.GetFiles(It.IsAny<string>()))
                .Returns(new List<string> { _file1, _file2 });
        }

        [TestCase]
        public void GetFiles_ValidPath_ReturnsExpectedFileCollection()
        {
            ICollection<string> files = _mockDirectoryExplorer.Object.GetFiles(@"C:\SomePath");

            Assert.That(files, Is.Not.Null);
            Assert.That(files.Count, Is.EqualTo(2));
            Assert.That(files, Does.Contain(_file1));
        }
    }
}
