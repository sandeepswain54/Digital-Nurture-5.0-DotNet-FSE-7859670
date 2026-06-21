using System.Collections.Generic;
using NUnit.Framework;
using FourSeasonsLib;

namespace FourSeasonsLib.Tests
{
    [TestFixture]
    public class SeasonFinderTests
    {
        private SeasonFinder _seasonFinder;

        [SetUp]
        public void Setup()
        {
            _seasonFinder = new SeasonFinder();
        }

        private static IEnumerable<TestCaseData> SeasonTestCases()
        {
            yield return new TestCaseData("February").Returns("Spring");
            yield return new TestCaseData("March").Returns("Spring");
            yield return new TestCaseData("April").Returns("Summer");
            yield return new TestCaseData("May").Returns("Summer");
            yield return new TestCaseData("June").Returns("Summer");
            yield return new TestCaseData("July").Returns("Monsoon");
            yield return new TestCaseData("August").Returns("Monsoon");
            yield return new TestCaseData("September").Returns("Monsoon");
            yield return new TestCaseData("October").Returns("Autumn");
            yield return new TestCaseData("November").Returns("Autumn");
            yield return new TestCaseData("December").Returns("Winter");
            yield return new TestCaseData("January").Returns("Winter");
        }

        [TestCaseSource(nameof(SeasonTestCases))]
        public string GetSeason_ValidMonth_ReturnsExpectedSeason(string month)
        {
            return _seasonFinder.GetSeason(month);
        }

        [TestCaseSource(typeof(SeasonTestCaseData), nameof(SeasonTestCaseData.Cases))]
        public void GetSeason_ValidMonth_ReturnsExpectedSeason_AlternateSource(string month, string expectedSeason)
        {
            string actual = _seasonFinder.GetSeason(month);
            Assert.That(actual, Is.EqualTo(expectedSeason));
        }
    }

    public class SeasonTestCaseData
    {
        public static IEnumerable<TestCaseData> Cases
        {
            get
            {
                yield return new TestCaseData("February", "Spring");
                yield return new TestCaseData("June", "Summer");
                yield return new TestCaseData("August", "Monsoon");
                yield return new TestCaseData("November", "Autumn");
                yield return new TestCaseData("January", "Winter");
            }
        }
    }
}
